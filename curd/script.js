$(document).ready(async function () {
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

        userData.forEach((user) => {
          const mainDiv = $("<div></div>")
            .addClass("user")
            .attr("id", "mainID")
            .attr("data-id", user.id);

          const div1 = $("<div></div>").attr("id", "div1");
          const strong = $("<strong>").text(user.name);
          const span = $("<span>").text(" - " + user.email);
          div1.append(strong).append(span);

          const div2 = $("<div></div>").attr("id", "div2").addClass("btn");
          const buttonDel = $("<button></button>")
            .addClass("del")
            .text("Delete")
            .on("click", function () {
              console.log(user.id);
              const id = user.id;
              $.ajax({
                url: `${API_LINK}/${id}`,
                type: "DELETE",
                success: function () {
                  alert("User with ID " + id + " deleted Successfully");
                },
              });
            });
          const buttonUpdate = $("<button></button>")
            .addClass("update")
            .text("Update")
            .on("click", function () {
              const id = user.id;
              const name = prompt("Enter the Updated name: ", user.name);
              const email = prompt("Enter the Updated Email: ", user.email);

              if (!name || !email) {
                alert("Please Enter the value for Update..");
                return;
              }
              $.ajax({
                url: `${API_LINK}/${id}`,
                method: "PUT",
                data: JSON.stringify({ name, email }),
                contentType: "application/json",
                success: function () {
                  console.log("Successfully Updated...!");
                  alert("Successfuly updated");
                },
              });
            });
          div2.append(buttonDel).append(buttonUpdate);

          mainDiv.append(div1).append(div2);
          resultPage.append(mainDiv);
        });
      } catch (err) {
        console.log("Internal Server Error");
      }
    });

  //POST: Add the new User
  $("#form").submit(function (e) {
    e.preventDefault();
    try {
      const name = nameInput.val().trim();
      const email = emailInput.val().trim();

      if (!name || !email) {
        alert("Please enter the input properly");
        return;
      }

      const userData = { name, email };
      $.ajax({
        url: API_LINK,
        type: "POST",
        data: JSON.stringify(userData),
        contentType: "application/json",
        dataType: "json",
        success: function (res) {
          console.log("Succssfully Submited ");
          $("#userName").val("");
          $("#userEmail").val("");
          alert("Successfully submited");
        },
        error: function (xhr, status, error) {
          console.log("Error Status: ", xhr.status);
          console.log("Error Response : ", xhr.responseText);
        },
      });
    } catch (err) {
      console.log("Internal Server Error");
      alert("Internal Server Error");
    }
  });

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
  document
    .getElementById("view_user")
    .addEventListener("click", async function (e) {
      try {
        const userID = prompt("Enter the User ID: ");
        const apiURL = await fetch(`${API_LINK}/${userID}`);
        const user = await apiURL.json();
        if (!user) {
          alert("Please Enter the Correct User ID");
          return;
        }
        resultPage.empty();

        const mainDiv = $("<div></div>")
          .addClass("user")
          .attr("data-id", user.id);

        const div1 = $("<div></div>").attr("id", "div1");
        const strong = $("<strong>").text(user.name);
        const span = $("<span>").text(" - " + user.email);
        div1.append(strong).append(span);

        const div2 = $("<div></div>").attr("id", "div2").addClass("btn");
        const buttonDel = $("<button></button>").addClass("del").text("Delete");
        const buttonUpdate = $("<button></button>")
          .addClass("update")
          .text("Update");
        div2.append(buttonDel).append(buttonUpdate);

        mainDiv.append(div1).append(div2);
        resultPage.append(mainDiv);
      } catch (err) {
        alert("Internal Server Error");
        return;
      }
    });

  //DELETE : Delete the user by id
  document
    .getElementById("delete")
    .addEventListener("click", async function (e) {
      try {
        const userID = prompt("Enter the User ID for delete: ");
        const userData = await fetch(`${API_LINK}/${userID}`, {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
        });
        const users = await userData.json();
        alert("Successfully Deleted");
        console.log(users.name);
      } catch (err) {
        console.log("Internal Server Error");
        alert("Internal Server Error");
      }
    });

  //DELETE: All the users
  function deleteAllUser() {
    $.get(API_LINK, function (users) {
      try {
        users.forEach((user) => {
          $.ajax({
            url: `${API_LINK}/${user.id}`,
            type: "DELETE",
            success: function (res) {
              console.log("Deleted Successfuly  ID", res.id);
            },
            error: function (xhr, status, error) {
              console.log(err.status);
            },
          });
          alert("Deleted Successfully!");
        });
      } catch (err) {
        console.log("Internal server error");
        alert("Internal server error");
      }
    });
  }

  //Update Single User
  document
    .getElementById("update_user")
    .addEventListener("click", async function (e) {
      try {
        const id = prompt("Enter the User ID for Update: ");
        const idData = await fetch(`${API_LINK}/${id}`);
        const data = await idData.json();
        const name = prompt("Enter the Updated Name: ", data.name);
        const email = prompt("Enter the Updated Email: ", data.email);

        if (!name || !email) {
          console.log("Enter the input Properly");
          alert("Enter the input Properly");
          return;
        }

        const updatedData = fetch(`${API_LINK}/${id}`, {
          method: "PUT",
          header: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ name, email }),
        });

        alert("Updated Successfuly!!");
      } catch (err) {
        console.log("Internal server error");
        alert("Internal server error");
      }
    });

  const searching = await fetch(API_LINK);
  const arrSearch = await searching.json();

  console.log(arrSearch);

  $("#search").on("input", function (e) {
    const users = arrSearch.filter((user) => {
      return user.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    result(users);
  });

  function result(users) {
    try {
      resultPage.empty();
      const newTag = $("<h1></h1>").text("All Users in JSON DB");
      resultPage.css("display", "none").append(newTag).fadeIn("slow");

      users.forEach((user) => {
        const mainDiv = $("<div></div>")
          .addClass("user")
          .attr("id", "mainID")
          .attr("data-id", user.id);

        const div1 = $("<div></div>").attr("id", "div1");
        const strong = $("<strong>").text(user.name);
        const span = $("<span>").text(" - " + user.email);
        div1.append(strong).append(span);

        const div2 = $("<div></div>").attr("id", "div2").addClass("btn");
        const buttonDel = $("<button></button>")
          .addClass("del")
          .text("Delete")
          .on("click", function () {
            console.log(user.id);
            const id = user.id;
            $.ajax({
              url: `${API_LINK}/${id}`,
              type: "DELETE",
              success: function () {
                alert("User with ID " + id + " deleted Successfully");
              },
            });
          });
        const buttonUpdate = $("<button></button>")
          .addClass("update")
          .text("Update")
          .on("click", function () {
            const id = user.id;
            const name = prompt("Enter the Updated name: ", user.name);
            const email = prompt("Enter the Updated Email: ", user.email);

            if (!name || !email) {
              alert("Please Enter the value for Update..");
              return;
            }
            $.ajax({
              url: `${API_LINK}/${id}`,
              method: "PUT",
              data: JSON.stringify({ name, email }),
              contentType: "application/json",
              success: function () {
                console.log("Successfully Updated...!");
                alert("Successfuly updated");
              },
            });
          });
        div2.append(buttonDel).append(buttonUpdate);

        mainDiv.append(div1).append(div2);
        resultPage.append(mainDiv);
      });
    } catch (err) {
      console.log("Internal Server Error");
    }
  }
});
