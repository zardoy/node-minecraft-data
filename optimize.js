const _ = require('lodash')

const fs = require('fs')

const jsonPath = './minecraft-data/data/pc/0.30c/blocks.json'

const json = JSON.parse(fs.readFileSync(jsonPath, 'utf8'))

const fields = {}

// skip if not array

// stage: scan for defaults

for (const item of json) {
    for (const [name, _value] of Object.entries(item)) {
        const type = value === null ? 'boolean'  : typeof value;
        switch (type) {
            case 'string':
            case 'number':
            case 'boolean': {
                const value = type === 'string' ? `"${value}"` : value
                fields[name] ??= {}
                fields[name][value] ??= 0
                fields[name][value]++
            }
        }
    }
}

// stage: calculate defaults

const arrayDefaults = {}

for (const [name, values] of Object.entries(fields)) {
    const sorted = _.sortBy(Object.entries(values), ([, value]) => value);
    const lastEntry = sorted.at(-1)
    const count = lastEntry[0]
    if (!count || count === 1) continue
    arrayDefaults[name] = JSON.parse(lastEntry[1])
}

// stage: use defaults
