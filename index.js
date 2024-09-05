const fs = require('fs');
const path = require('path');

const directory = '/data'; // Directory to write files
const fileSizeMB = 10; // Size of each file in MB
const numberOfFiles = 1000; // Number of files to create

const generateRandomData = (sizeInMB) => {
    const sizeInBytes = sizeInMB * 1024 * 1024;
    const buffer = Buffer.alloc(sizeInBytes);
    for (let i = 0; i < sizeInBytes; i++) {
        buffer[i] = Math.floor(Math.random() * 256);
    }
    return buffer;
};

const writeFile = (index) => {
    return new Promise((resolve, reject) => {
        const filePath = path.join(directory, `file${index}.bin`);
        const data = generateRandomData(fileSizeMB);

        fs.writeFile(filePath, data, (err) => {
            if (err) {
                reject(err);
            } else {
                console.log(`Written file ${index}`);
                resolve();
            }
        });
    });
};

const run = async () => {
    try {
        // Ensure the directory exists
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory);
        }

        // Write files until the disk space is exhausted
        for (let i = 0; i < numberOfFiles; i++) {
            await writeFile(i);
        }
        
        console.log('Disk space exhaustion test completed.');
    } catch (error) {
        console.error('Error during disk usage test:', error);
    }
};

run();
