const expect = require("expect");
var {generateMessage, generateLocationMessage} = require("./message.js");
describe("Generate message", ()=>{
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


describe("Generate location", ()=>{
  it("should generate correct location object", ()=>{
    var from="Andrew";
    var coords = {latitude:1, longitude:1};
    var url = `https://www.google.com/maps?q=1,1`;
    var message = generateLocationMessage(from, coords.latitude, coords.longitude);
    expect(message.from).toBe(from);
    expect(message.url).toBe(url);
    //or
    expect(message).toMatchObject({from,url});
    expect(typeof message.createdAt).toBe("number");
  });
});
