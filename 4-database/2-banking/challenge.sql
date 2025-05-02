/*
    Challenge: Implement a Secure Fund Transfer Function

    In this challenge, you will implement a PostgreSQL stored function to simulate transferring funds 
    between two accounts in a banking system. The function must follow proper validation, ensure data 
    integrity, and log transactions with a shared reference.

    Your function should be named:
    banking.transfer_funds(from_id INT, to_id INT, amount NUMERIC)

    The function must:

    - Prevent transfers to the same account
    - Ensure the transfer amount is greater than zero
    - Validate that both sender and recipient accounts exist
    - Prevent transfers if either account is marked as "frozen"
    - Ensure the sender has sufficient funds
    - Debit the sender and credit the recipient atomically
    - Log two transactions: a withdrawal and a deposit, both linked by the same UUID reference
    - Raise meaningful exceptions for all validation failures

    The function should perform all operations within a safe transactional context, maintaining 
    database consistency even in the event of failure.

    Notes:
    - In order to test you can mock some additional data in the tables that participates in this challenge.
    - Make sure of raising errors when they're present

    ERD:
    +---------------------+            +--------------------------+
    |     accounts        |            |      transactions        |
    +---------------------+            +--------------------------+
    | account_id (PK)     |<-----------| transaction_id (PK)      |
    | balance             |            | account_id (FK)          |
    | status              |            | amount                   |
    +---------------------+            | transaction_type         |
                                       | reference                |
                                       | transaction_date         |
                                       +--------------------------+
*/


-- your solution here

CREATE OR REPLACE FUNCTION transfer_funds (
	from_id INT, 
	to_id INT, 
	amount NUMERIC
) RETURNS VOID as $$
DECLARE
   is_same_account boolean;
   sender_balance NUMERIC;
   sender_status TEXT;
   recipient_status TEXT;
   account_balance NUMERIC;
   transaction_reference UUID := gen_random_uuid();
BEGIN
    IF from_id = to_id THEN
        RAISE EXCEPTION 'Transaction not allowed: id for both accounts is the same.';
    END IF;	

    IF amount <= 0 THEN
        RAISE EXCEPTION 'Transaction not allowed: the transfer amount must be greater than zero';
    END IF;

    SELECT 
        balance, 
        status
    INTO 
        sender_balance, 
        sender_status
    FROM 
        banking.accounts ba
    WHERE 
        ba.account_id = from_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Account with (ID: %) Not found', from_id ;
    END IF;

    IF sender_status = 'frozen' THEN
        RAISE EXCEPTION 'origin account frozen (ID: %)', from_id;
    END IF;

    SELECT 
        status
    INTO 
        recipient_status
    FROM 
        banking.accounts
    WHERE 
        account_id = to_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Account with (ID: %) Not found', to_id;
    END IF;

    IF recipient_status = 'frozen' THEN
        RAISE EXCEPTION 'recipient account frozen (ID: %)', to_id;
    END IF;

    IF sender_balance < amount THEN
        RAISE EXCEPTION 'sender has not sufficient funds';
    END IF;

    BEGIN
        
        UPDATE 
            banking.accounts
        SET 
            balance = balance - amount
        WHERE 
            account_id = from_id;
        
        UPDATE 
            banking.accounts
        SET 
            balance = balance + amount
        WHERE 
            account_id = to_id;
        
        INSERT INTO banking.transactions (
            account_id, 
            amount, 
            transaction_type, 
            reference, 
            transaction_date
        ) VALUES 
            (from_id, amount, 'withdrawal', transaction_reference, NOW()),
            (to_id, amount, 'deposit', transaction_reference, NOW());
    EXCEPTION 
        WHEN OTHERS THEN
            RAISE EXCEPTION 'An error occur transaction not executing: %', SQLERRM;
    END;
END;
$$ language plpgsql;