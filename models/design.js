var mongoose = require("mongoose");
//MONGOOSE/MODEL CONFIG
var designSchema = new mongoose.Schema({
   region: String,
   sharepointid: String,
   type: String,
   moagent: String,
   enduser: String,
   systemtype: String,
   notes: String,
   date: {type: Date},
   engineer: String,
   headtype: String,
   apwidth: String,
   apheight: String,
   convinheight: String,
   convoutheight: String,
   convlength: String,
   handing: String,
   belttype: String,
   product: String,
   packaging: String,
   designid: String,
   sapnum: String,
   so:String,
   reject: String,
   

   author:[
            {
             id: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref:"User"
                },
            username: String   
            }
            ],
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
      ]
});
module.exports = mongoose.model("Design", designSchema);