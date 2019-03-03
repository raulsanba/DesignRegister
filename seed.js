var mongoose = require("mongoose");
var Design = require("./models/design");
var Comment = require("./models/comment")

var data = [
    {
    sharepointid: "1000",
   type: "Data1",
   moagent: "Data1.1",
   enduser: "Data1.2",
   systemtype: "Data1.3",
   notes: "Data1.4",
   date: "01/01/2019",
   engineer: "Data1.5",
   headtype: "Data1.6",
   apwidth: "Data1.7",
   apheight: "Data1.8",
   convheight: "Data1.9",
   convlength: "Data1.10",
   handing: "Data1.11",
   belttype: "Data1.12",
   product: "Data1.13",
   packaging: "Data1.14",
   designid: "Data1.15",
   sapnum: "Data1.16"
    }
    ];
    
//  function seedDB(){
//      Design.remove({}, function(err){
//          if (err){
//              console.log(err);
//          } else{
//              console.log("All the designs were removed from the DB");
            
            
                // data.forEach(function(seed){
                //     Design.create(seed, function(err, design){
                //      if (err){
                //          console.log(err);
                //         } else {
                //             console.log("Design added!");
                //             Comment.create(
                //         {
                //             text: "This place is great, but I wish there was internet",
                //             author: "Homer"
                //         }, function(err, comment){
                //             if(err){
                //                 console.log(err);
                //             } else {
                //                 design.comments.push(comment);
                //                 design.save();
                //                 console.log("Created new comment");
                //             }
                //         });
        //     }
        // });
    
        
    // });
    // }
    // });
// }


// module.exports = seedDB ;