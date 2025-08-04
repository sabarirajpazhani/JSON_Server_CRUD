API_LINK = "http://localhost:3000/users";

const nameInput = $("#userName");
const emailInput = $("#userEmail");
const resultPage = $("#resultPage");

//GET : all the users
document
  .getElementById("view_All")
  .addEventListener("click", async function (e) {
    try {
      const userDataAPI = await fetch(API_LINK);
      const userData = await userDataAPI.json();
      resultPage.empty();
      const newTag = $("<h1></h1>").text("All Users in JSON DB");
      resultPage.css("display", "none").append(newTag).fadeIn("slow");
      console.log(newTag);

      userData.forEach((user) => {
        const mainDiv = $("<div></div>")
          .addClass("user")
          .attr("data-id", user.id);

        const div1 = $("<div></div>").attr("id", "div1");
        const strong = $("<strong>").text(user.name);
        const span = $("<span>").text(" - " + user.email);
        div1.append(strong).append(span);

        const div2 = $("<div></div>").attr("id", "div2").addClass("btn");
        const buttonDel = $("<button></button>").addClass("del").text("Delete");
        const buttonUpdate = $("<button></button>").addClass("update").text("Update");
        div2.append(buttonDel).append(buttonUpdate);


        mainDiv.append(div1).append(div2);
        resultPage.append(mainDiv);
      });
    } catch (err) {
      console.log("Internal Server Error");
    }
  });

//POST: Add the new User

// document.getElementById("form").addEventListener("submit", async function (e) {
//   e.preventDefault();
//   try {
//     const name = nameInput.val().trim();
//     const email = emailInput.val().trim();
//     if (name && email) {
//       const apiURL = await fetch(API_LINK, {
//         method: "POST",
//         headers: {
//           "Content-type": "application/json",
//         },
//         body: JSON.stringify({ name, email }),
//       });
//       const data = await apiURL.json();
//       console.log(data);
//       console.log("Successfully Uploaded");
//       document.getElementById("msg").innerText = "Successfully submited";
//     } else {
//       console.log("Enter all the input");
//       $("#userName").css("border", "3px solid red");
//       $("#userEmail").css("border", "3px solid red");
//     }
//   } catch (err) {
//     console.log("Internal server error");
//   }
// });

//GET: Single user
document.getElementById("view_user").addEventListener("click", function (e) {
  const userID = prompt("Enter the User ID: ");
  console.log(userID);
  const apiURL = fetch(`${API_LINK}/${userID}`);
  console.log(apiURL);
});

// `<div class="user" data-id="${user.id}">
//       <div><strong>${user.name}</strong> - ${user.email}</div>
//       <div class="btn">
//           <button class="del">Delete</button>
//           <button class="update">Update</button>
//       </div>
//   </div>`
