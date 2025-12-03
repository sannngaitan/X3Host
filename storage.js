// storage.js
const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'data');
const STORAGE_FILE = path.join(DATA_DIR, 'storage.json');

// Asegura carpeta data
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

let data = {};

// Carga desde disco si existe
try {
    if (fs.existsSync(STORAGE_FILE)) {
        const raw = fs.readFileSync(STORAGE_FILE, 'utf8');
        data = JSON.parse(raw);
    }
} catch (e) {
    console.error('[storage] Error leyendo storage.json, empezando vacío:', e);
    data = {};
}

function save() {
    try {
        fs.writeFileSync(STORAGE_FILE, JSON.stringify(data, null, 2), 'utf8');
    } catch (e) {
        console.error('[storage] Error guardando storage.json:', e);
    }
}

module.exports = {
    getItem(key) {
        return Object.prototype.hasOwnProperty.call(data, key)
            ? data[key]
            : null;
    },
    setItem(key, value) {
        data[key] = value;
        save();
    },
    removeItem(key) {
        delete data[key];
        save();
    }
};
