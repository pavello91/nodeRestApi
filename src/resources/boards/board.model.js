const uuid = require('uuid');

class Column {
    constructor({ id = uuid(), title = 'Board', order = 1 } = {}) {
        this.id = id;
        this.title = title;
        this.order = order;
    }
}
module.exports = Column;

class Board {
    constructor({ id = uuid(), title = 'Board', columns = [] } = {}) {
        this.id = id;
        this.title = title;
        this.columns = columns.map((item, index) => {
            return new Column(item);
        });
    }
}

module.exports = Board;