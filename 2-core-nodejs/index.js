import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

import path from 'path'
import fs from 'fs';


const outputFilePath = path.join(process.cwd(), 'wishlist.json');

async function main() {
    const rl = readline.createInterface({ input, output });
    //TODO 1: Read user input
    const answer = await rl.question("Type the number according to Menu option ");

    //TODO 2: switch to current case
    selectMenuOption(answer);

    rl.close();
}

async function selectMenuOption(answer) {
    //select case base in answer
    switch (answer) {
        case "1": {
            console.log('Add items to wishlist.');
            addItem('my new item xddd', 1111.00, 'memito sv');
            break;
        }
        case "2": {
            console.log('View all wishlist items.');
            listAllItems(outputFilePath);
            break;
        }
        case "3": {
            console.log('Edit item by ID');
            editItemById(3, {
                name: "my favorite product",
                price: "23.41",
                store: "wachime"
            })
            break;
        }
        case "4": {
            console.log('Delete item by ID');
            break;
        }
        default: {
            console.log(`The ${answer} option is not available.`);
        }
    }
}

async function addItem(name_, price_, store_) {
    try {
        //read current data and convert to object
        const receivedData = JSON.parse(await readFile(outputFilePath));
        //new item object id must be generate auto from last index
        const newItem = {
            id: 1,
            name: name_,
            price: price_,
            store: store_
        }
        //add new item to wishlist items
        receivedData.wishlist.items.push(newItem);

        //write into to wishlist.json
        writeContentToFile(receivedData);

    } catch (err) {
        console.error("Some error\n ", err.message);
    }

    return 1;
}
//TODO 3: get file results and list it in screen
function listAllItems(filePath) {
    //using promises mixing with async 
    // readFile(filePath).then((chunk)=>{
    //     console.log('--- File chunk start ---');
    //     console.log(chunk);
    //     console.log('--- File chunk end ---');
    // }
    // );
    (async function () {
        try {
            const receivedData = JSON.parse(await readFile(filePath));
            // console.log('--- File chunk start ---');
            //console.log(receivedData.wishlist.items);
            console.log(`*******************************************${receivedData.wishlist.header}*************************************`);
            receivedData.wishlist.items.forEach(item => {
                console.log(`name: ${item.name}\nprice: ${item.price}\nstore: ${item.store}`);
                console.log(`*******************************************************************************************`);

            });
            // console.log('--- File chunk end ---');

        } catch (err) {
            console.error(err.message);
        }
    })();
    return 1;
}

//Edit an existing item

async function editItemById(id, updateContent) {

    try {
        const receivedData = JSON.parse(await readFile(outputFilePath));

        receivedData.wishlist.items.forEach(item => {
            if (item.id === id) {
                item.name = updateContent.name;
                item.price = updateContent.price;
                item.store = updateContent.store

                console.log(`id${item.id} modified with ${JSON.stringify(item)}`);
            }
        });
        writeContentToFile(receivedData);
    } catch (err) {
        console.error(err.message);
    }
}

async function deleteItemById(id) {

    try {
        const receivedData = JSON.parse(await readFile(outputFilePath));

        let itemToDelete;

        receivedData.wishlist.items.forEach(item => { if (item.id === id) {itemToDelete = item.id;}});
        receivedData.wishlist.items.splice(itemToDelete)
        writeContentToFile(receivedData);
    } catch (err) {
        console.error(err.message);
    }
}

//TODO 4: use readFile method
async function readFile(filePath) {
    const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });
    try {
        for await (const chunk of readStream) {
            // console.log('--- File chunk start ---');
            // console.log(chunk);
            // console.log('--- File chunk end ---');
            return chunk;
        }
        console.log('Finished reading the file.');
    } catch (error) {
        console.error(`Error reading file: ${error.message}`);
    }
}

async function writeContentToFile(content) {
    console.log(typeof (content));
    try {
        await fs.writeFileSync(outputFilePath, JSON.stringify(content));
        return 1; //writing good
    } catch (err) {

        console.log("Error writing wishlist.json\n", err);
        return 0;
    }
}


main();