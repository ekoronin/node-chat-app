// [
//   {
//     id: "akjfowurh",
//     name: "Andrew",
//     room: "The Office Fans"
//   }
// ]

//addUser (id, name, room)
//removeUser (id)
//getUser(id) -> {user}
//getUserList(room) - [names]


class Users {
  constructor() {
    this.users = [];
  }

  addUser(id, name, room) {
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }

    removeUser(id) {
      var user;
      this.users = this.users.filter((u)=>{
        var ret=true;
        if (u.id===id){
          user = u;
          ret = false;
        }
        return ret;
      });

      return user;
    }

    getUser(id){
      var user = this.users.find((u)=>u.id === id);

      return user;
    }

    getUserList(room) {
      var names = this.users
        .filter((u)=>u.room === room)
        .map((u)=>u.name);

      return names;
    }
}

module.exports = {Users}
