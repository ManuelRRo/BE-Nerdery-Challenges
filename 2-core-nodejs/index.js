import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

import path from 'path';
import fs from 'fs';

const outputFilePath = path.join(process.cwd(), 'wishlist.json');

const NOT_FOUND = -1;

async function main() {

    while (true) {

        console.log('');
        console.log('📌 Welcome to the Wishlist Tracker!');
        console.log('Please choose an option from the menu below:');
        console.log('1. Add items to wishlist.');
        console.log('2. View all wishlist items.');
        console.log('3. Edit item by ID.');
        console.log('4. Delete item by ID.');
        console.log('type "quit" to exit');
        const answer = await getUserAnswer("MyWishList:~/ ");

        if (answer === "quit") {

            console.log("bye");

            break;
        }

        await selectMenuOption(answer);
    }

}

async function getUserAnswer(msg) {
    const rl = readline.createInterface({ input, output });

    const answer = await rl.question(msg);
    rl.close();
    return answer;
}

async function selectMenuOption(answer) {

    switch (answer) {
        case "1": {
            console.log('Add items to wishlist.');
            await addItem();
            break;
        }
        case "2": {
            console.log('View all wishlist items.');
            await listAllItems(outputFilePath);
            break;
        }
        case "3": {
            console.log('Edit item by ID');
            await editItemById();
            break;
        }
        case "4": {
            console.log('Delete item by ID');
            await deleteItemById();
            break;
        }
        default: {
            console.log(`The ${answer} option is not available.`);
        }
    }
}

async function addItem() {
    try {
        const name = await getUserAnswer("Name item: ~:/ ");
        const price = parseFloat(await getUserAnswer("Price item: ~:/ "));
        const store = await getUserAnswer("Store item: ~:/ ");

        const wishList = JSON.parse(await readFile(outputFilePath));

        const wishListItems = wishList.wishlist.items;

        const newItem = {
            id: wishListItems.length + 1,
            name: name,
            price: price,
            store: store
        }

        wishListItems.push(newItem);

        await writeContentToFile(wishList);

    } catch (err) {
        console.error("Some error\n ", err.message);
    }

    return 1;
}

async function listAllItems(filePath) {

    try {
        const wishListHeader = JSON.parse(await readFile(outputFilePath)).wishlist.header;

        const wishListItems = JSON.parse(await readFile(filePath)).wishlist.items;

        if (wishListItems.length === 0) { 
            console.log("Sorry no items.") 
        }
        else {
            console.log(`*******************************************${wishListHeader}*************************************`);
            wishListItems.forEach(item => {
                console.log(`Id: ${item.id}\nname: ${item.name}\nprice: ${item.price}\nstore: ${item.store}`);
                console.log(`*******************************************************************************************`);

            });
        }
    } catch (err) {
        console.error(err.message);
    }

}

async function editItemById() {

    try {
        const id = Number(await getUserAnswer("Item Id: ~:/ "));

        const wishList = JSON.parse(await readFile(outputFilePath));

        const wishListItems = wishList.wishlist.items;

        const oldWishListItem = wishListItems.find(item => item.id === id);

        const current_index = wishListItems.findIndex(item => item.id === id);

        if (wishListItems.length === 0) {
            console.log("Sorry no items.")
        }

        if (current_index !== NOT_FOUND) {
            const name = await getUserAnswer(`Old name item: '${oldWishListItem.name}' ~:/ `);
            const price = parseFloat(await getUserAnswer(`Old Price item: '${oldWishListItem.price}' ~:/ `));
            const store = await getUserAnswer(`Old Store item: '${oldWishListItem.store}' ~:/ `);

            const updatedItem = {
                id: id,
                name:name,
                price:price,
                store:store,
            };

            wishListItems[current_index] = updatedItem;
            
            await writeContentToFile(wishList);
            
        } else {
            console.log(`\n No item with id: ${id}`);
        }

    } catch (err) {
        console.error(err.message);
    }
}

async function deleteItemById() {

    try {

        const id = Number(await getUserAnswer("Item Id: ~:/ "));

        const wishList = JSON.parse(await readFile(outputFilePath));

        const wishListItems = wishList.wishlist.items;

        if (wishListItems.length === 0) {
            console.log("\n Sorry no items.");
        }
        else {

            let itemToDelete = wishListItems.findIndex(item => item.id === id);

            if (itemToDelete !== NOT_FOUND) {

                wishListItems.splice(itemToDelete, 1);

                wishListItems.map((item,index) => item.id = index + 1);
                
                await writeContentToFile(wishList);

            } else {

                console.log(`\n Element with id ${id} Not found.`);

            }

        }

    } catch (err) {
        console.error(err.message);
    }
}

async function readFile(filePath) {

    const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });

    try {

        let content = "";

        for await (const chunk of readStream) {

            content += chunk;

        }

        return content;

    } catch (error) {

        console.error(`\n Error reading file: ${error.message}`);

    }
}

async function writeContentToFile(content) {

    try {

        await fs.writeFileSync(outputFilePath, JSON.stringify(content));

        console.log("\n Saved.");

    } catch (err) {

        console.log("Error writing wishlist.json\n", err);

        return 0;
    }
}

main();