import express from "express"
import { users } from "../server.js";
import fs from "fs";
import { DataTypeOfUser } from "../interface.js";
export let router = express.Router();


// router.use(function (req, res, next) {
//     // .. some logic here .. like any other middleware
//     next()
//   })

router.get('/getUsers',(req , res)=>{
    res.json(users);
});
router.get('/getUsers/:id', (req, res) => {
      users.splice(parseInt(req.params.id),1);
      console.log(req.url)
      let i = 0;
      users.forEach((element: { id: number; })=> {
          element.id = i++;
      });
      i = 0;
      updateDb();
      res.status(200);
      res.send('success')
    });
function updateDb(){
    fs.writeFile('db.json', JSON.stringify(users,null,2), function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("JSON saved");
        }})
}
          
router.post('/saveUser',(req , res)=>{
users.push(req.body);
res.status(200);
updateDb();
res.send('success')

})

router.post('/updateUser:id', (req, res) => {
    const found = users.some((member: { id: number; }) => member.id === parseInt(req.params.id));
  
    if (found) {
      const updMember:DataTypeOfUser = req.body;
      users.forEach((member:DataTypeOfUser) => {
        if (member.id === parseInt(req.params.id)) {
          member.firstName = updMember.firstName;
          member.middleName = updMember.middleName;
          member.lastName = updMember.lastName;
          member.email = updMember.email;
          member.phone=updMember.phone;
          member.role = updMember.role;
          member.address = updMember.address;
  
          res.json({ msg: 'Member updated', member });
        }
      });
    } else {
      res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
    }
  });
