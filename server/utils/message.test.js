const expect = require("expect");
var {generateMessage} = require("./message.js");
describe("Geerate message", ()=>{
  it("should generate the correct message object", ()=>{
    var from = "Andrew";
    var text = "Test message";

    var message = generateMessage(from, text);
    expect(message.from).toBe(from);
    expect(message.text).toBe(text);
    //or
    expect(message).toMatchObject({from,text});

    expect(typeof message.createdAt).toBe("number");
  });
});
