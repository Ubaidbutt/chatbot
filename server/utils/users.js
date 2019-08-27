class Users {
    constructor () {
        this.users = [];
    }

    addUser (id, name, room) {
        const user = {id, name, room};
        this.users.push (user);
        return user;
    }

    removeUser (id) {
        // return user that was removed
        let user = this.getUser(id);

        if (user) {
            this.users = this.users.filter ((user) => user.id !== id);
        }
        return user;
    }

    getUser (id) {
        return this.users.filter ((user) => user.id === id)[0];
    }

    getUserList (room) {
        let users = this.users.filter ((user) => user.room === room );
        let namesArray = users.map ((user) => user.name );

        return namesArray;
    }
}

module.exports = {Users};