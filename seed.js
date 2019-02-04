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
    },
    {
    sharepointid: "2000",
   type: "Data2",
   moagent: "Data2.1",
   enduser: "Data2.2",
   systemtype: "Data2.3",
   notes: "Data2.4",
   date: "02/01/2019",
   engineer: "Data2.5",
   headtype: "Data2.6",
   apwidth: "Data2.7",
   apheight: "Data2.8",
   convheight: "Data2.9",
   convlength: "Data2.20",
   handing: "Data2.21",
   belttype: "Data2.22",
   product: "Data2.23",
   packaging: "Data2.24",
   designid: "Data2.25",
   sapnum: "Data2.26"
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