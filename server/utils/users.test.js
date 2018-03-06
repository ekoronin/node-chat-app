const expect = require("expect");
const {Users} = require("./users.js");

describe("User class", ()=>{

//
var users;
beforeEach (()=>{
  users = new Users();
  users.users = [{
    id: "1",
    name: "Mike",
    room: "Node course"
  },
  {
    id: "2",
    name: "Jen",
    room: "React course"
  },
  {
    id: "3",
    name: "Julie",
    room: "Node course"
  }];
});

  it("should add new users", ()=>{
    var users = new Users();
    var user = {
      id: "123",
      name: "Andrew",
      room: "The Office Fans"
    };
    var resUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });

  it("shoudl return names for Node course", ()=>{
    var userList = users.getUserList("Node course");
    expect(userList).toEqual(["Mike", "Julie"]);
  });

  it("shoudl return names for React course", ()=>{
    var userList = users.getUserList("React course");
    expect(userList).toEqual(["Jen"]);
  });

  it("should remove a user", ()=>{
    var mike = users.users[0];
    var user = users.removeUser("1");

    expect(user.id).toBe("1");
    expect(user).toMatchObject(mike);
    expect(users.users.length).toBe(2);
  });

  it("should NOT remove user when id invalid", ()=>{
    var user = users.removeUser("11");
    expect(user).toBeFalsy();
    expect(users.users.length).toBe(3);
  });

  it("should find user by id", ()=>{
    var user = users.getUser("2");

    expect(user.id).toBe("2");
    expect(user).toMatchObject(users.users[1]);
  });

  it("should NOT find user when id invalid", ()=>{
    var user = users.getUser("22");

    expect(user).toBeFalsy();
  });
})
