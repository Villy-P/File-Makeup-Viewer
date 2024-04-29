import data from '../file.json' assert { type: "json" };

for (let i = 0; i < data.files.length; i++) {
    console.log(`- \`${data.files[i].file}\``);
}