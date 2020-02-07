const db = require('../data/db-config.js')

function find () {
    return db('schemes');
}

function findById(id) {
    return db('schemes')
        .WHERE({id})
        .FIRST()
};

//this one has me stumped
function findSteps(id) {
    return db('steps')
    .SELECT ('steps.id', 's.scheme_name', 'steps.instructions')
    .JOIN ('schemes as s', 'steps.scheme_id', 's.id')
    .WHERE ({scheme_id: id});
}

function add (scheme) {
    return db('schemes')
    .INSERT (scheme, id)
    .THEN (([id]) => {
        return findById(id);
    });
}


function update (changes, id) {
    return db('schemes')
    .UPDATE(changes)
    .WHERE('id', id)
    .THEN (() => {
        return findById(id);
    });
}
function remove (id) {
    return db ('schemes')
    .WHERE ({id})
    .DEL();
}

module.exports + {
    find,
    findById,
    findSteps,
    add,
    update,
    remove

}