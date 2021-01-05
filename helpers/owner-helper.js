var db = require("../config/connection");
var collection = require("../config/collection");
const bcrypt = require("bcrypt");
const { static, response } = require("express");
const objectId = require("mongodb").ObjectID;
module.exports = {


  getScreens: (id) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.SCREEN_COLLECTION)
        .find({ OwnerId: objectId(id) })
        .toArray()
        .then((response) => {
          console.log(response, "screen");
          resolve(response);
        });
    });
  },
  addScreen: (data, id) => {
    return new Promise((resolve, reject) => {
      console.log(data);
      var Seat = (data.normalRows * data.normalSeats) + (data.vipRows * data.vipSeats) + (data.premiumRows * data.premiumSeats) + (data.excecutiveRows * data.excecutiveSeats)
      data.OwnerId = id
      data.Seat = Seat
      db
        .get()
        .collection(collection.SCREEN_COLLECTION)
        .insertOne(data)
        .then((response) => {
          resolve(response);
        });
    });
  },
  editScreen: (id, data) => {
    return new Promise((resolve, reject) => {
      console.log(data);
      var Seat = (data.normalRows * data.normalSeats) + (data.vipRows * data.vipSeats) + (data.premiumRows * data.premiumSeats) + (data.excecutiveRows * data.excecutiveSeats)
      data.OwnerId = id
      data.Seat = Seat
      db.get()
        .collection(collection.SCREEN_COLLECTION)
        .updateOne(
          { _id: objectId(id) },
          {
            $set: {
              normalRows: data.normalRows,
              normalSeats: data.normalSeats,
              vipRows: data.vipRows,
              vipSeats: data.vipSeats,
              premiumRows: data.premiumRows,
              premiumSeats: data.premiumSeats,
              excecutiveRows: data.excecutiveRows,
              excecutiveSeats: data.excecutiveSeats,
              Name: data.Name,
              Seat: data.Seat,
            },
          }
        )
        .then((response) => {
          resolve(response);
          console.log(response);
        });
    });
  },
  deleteScreen: (screenId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.SCREEN_COLLECTION)
        .removeOne({ _id: objectId(screenId) })
        .then((response) => {
          console.log("success");
          resolve({ status: true });
        });
    });
  },
  getScreen: (id) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.SCREEN_COLLECTION)
        .findOne({ _id: objectId(id) })
        .then((response) => {
          resolve(response);
        });
    });
  },
  addMovie: (data, id) => {
    return new Promise((resolve, reject) => {
      data.OwnerId = id;
      db.get()
        .collection(collection.MOVIE_COLLECTION)
        .insertOne(data)
        .then((response) => {
          resolve(response);
        });
    });
  },

  getMovies: () => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.MOVIE_COLLECTION)
        .find()
        .toArray()
        .then((response) => {
          console.log(response, "screen");
          resolve(response);
        });
    });
  },

  editMovie: (data, id) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.MOVIE_COLLECTION)
        .updateOne(
          { _id: objectId(id) },
          {
            $set: {
              Title: data.Title,
              Cast: data.Cast,
              Director: data.Director,
              Date: data.Date,
              Category: data.Category,
              Trailer: data.Trailer,
              Runtime: data.Runtime,
              Description: data.Description,
              Image: data.Image,
            },
          }
        );
    });
  },
  getMovie: (id) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.MOVIE_COLLECTION)
        .findOne({ _id: objectId(id) })
        .then((response) => {
          resolve(response);
        });
    });
  },
  deleteMovie: (id) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.MOVIE_COLLECTION)
        .removeOne({ _id: objectId(id) })
        .then((response) => {
          console.log("success");
          resolve({ status: true });
        });
    });
  },

  //upcoming movie

  addUpcomingMovie: (data, id) => {
    return new Promise((resolve, reject) => {
      data.OwnerId = id;
      db.get()
        .collection(collection.UPCOMING_MOVIE_COLLECTION)
        .insertOne(data)
        .then((response) => {
          resolve(response);
        });
    });
  },

  getUpcomingMovies: (id) => {
    console.log(id);
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.UPCOMING_MOVIE_COLLECTION)
        .find({ OwnerId: objectId(id) })
        .toArray()
        .then((response) => {
          console.log(response, "screen");
          resolve(response);
        });
    });
  },

  editUpcomingMovie: (data, id) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.UPCOMING_MOVIE_COLLECTION)
        .updateOne(
          { _id: objectId(id) },
          {
            $set: {
              Title: data.Title,
              Cast: data.Cast,
              Director: data.Director,
              Date: data.Date,
              Category: data.Category,
              Trailer: data.Trailer,
              Description: data.Description,
              Runtime: data.Runtime,
              Image: data.Image,
            },
          }
        );
    });
  },
  getUpcomingMovie: (id) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.UPCOMING_MOVIE_COLLECTION)
        .findOne({ _id: objectId(id) })
        .then((response) => {
          resolve(response);
        });
    });
  },
  deleteUpcomingMovie: (id) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.UPCOMING_MOVIE_COLLECTION)
        .removeOne({ _id: objectId(id) })
        .then((response) => {
          console.log("success");
          resolve({ status: true });
        });
    });
  },

  addShow: (data, screenId, OwnerId) => {
    return new Promise((resolve, reject) => {
      console.log(data);
      data.screenId = screenId;
      data.ownerId = OwnerId;
      db.get()
        .collection(collection.MOVIE_COLLECTION)
        .findOne({ _id: objectId(data.Movie) })
        .then((showData) => {
          console.log(showData, "show data");
          data.MovieName = showData.Title;
          db.get()
            .collection(collection.SHOW_COLLECTION)
            .insertOne(data)
            .then((response) => {
              resolve(response);
            });
        });
    });
  },
  getShowSchedule: (Id) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.SHOW_COLLECTION)
        .find({ screenId: Id })
        .toArray()
        .then((response) => {
          console.log(response);
          resolve(response);
        });
    });
  },

  editShow: (data, id) => {
    console.log(data);
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.MOVIE_COLLECTION)
        .findOne({ _id: objectId(data.Movie) })
        .then((showData) => {
          data.MovieName = showData.Title;
          db.get()
            .collection(collection.SHOW_COLLECTION)
            .updateOne(
              { _id: objectId(id) },
              {
                $set: {
                  Movie: data.Movie,
                  Time: data.Time,
                  Date: data.Date,
                  Vip: data.Vip,
                  Premium: data.Premium,
                  Excecutive: data.Excecutive,
                  Normal: data.Normal,
                  MovieName: data.MovieName,
                },
              }
            );
        });
    });
  },

  getShow: (Id) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.SHOW_COLLECTION)
        .findOne({ _id: objectId(Id) })
        .then((response) => {
          console.log(response);
          resolve(response);
        });
    });
  },

  deleteShow: (showId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.SHOW_COLLECTION)
        .removeOne({ _id: objectId(showId) })
        .then((response) => {
          console.log("success");
          resolve({ status: true });
        });
    });
  },

  getCode: () => {
    return new Promise((resolve, reject) => {
      var chars = "123456789101234567891012345678910";
      var passwordLength = 6;
      var password = "";

      for (var i = 0; i < passwordLength; i++) {
        var randomPassword = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomPassword, randomPassword + 6);
        resolve(password);
      }
    });
  },
  getDateTime: (data, id) => {
    console.log(data);
    return new Promise((resolve, reject) => {
      console.log(id);
      db.get()
        .collection(collection.SHOW_COLLECTION)
        .find({ screenId: id, Date: data.date })
        .toArray()
        .then((dateData) => {
          // console.log(response);
          var date = new Date(data.date + " " + data.time);
          var hoursLater = new Date(
            new Date(date).setHours(new Date(date).getHours())
          );
          for (var i = 0; i < dateData.length; i++) {
            var oldDate = new Date(dateData[i].Date + " " + dateData[i].Time);

            var oldHour = new Date(
              new Date(oldDate).setHours(new Date(oldDate).getHours() + 3)
            );
            if (
              new Date(hoursLater).toLocaleTimeString() >=
              new Date(oldHour).toLocaleTimeString()
            ) {
              console.log("success");
              resolve({ status: true });
            } else {
              resolve({ status: false });
            }
          }
        });
    });
  },
  // update password

  updatePassword: (details) => {
    return new Promise(async (resolve, reject) => {
      let owner = await db
        .get()
        .collection(collection.OWNER_COLLECTION)
        .findOne({ Email: details.email });

      if (owner) {
        bcrypt.compare(details.oldps, owner.Password).then(async (status) => {
          if (status) {
            console.log("successfull");
            let newPassword = await bcrypt.hash(details.newps, 10);
            db.get()
              .collection(collection.OWNER_COLLECTION)
              .updateOne(
                { Email: details.email },
                {
                  $set: {
                    Password: newPassword,
                  },
                }
              );
            resolve({ status: true });
          } else {
            console.log("failed");
            resolve({ status: false });
          }
        });
      } else {
        resolve({ status: false });
      }
    });
  },

  //edit profile

  editProfile: (id, details) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.OWNER_COLLECTION)
        .updateOne(
          { _id: objectId(id) },
          {
            $set: {
              Name: details.name,
            },
          }
        )
        .then((response) => {
          resolve(response);
        });
    });
  },

  //check owner

  checkOwner: (email) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.OWNER_COLLECTION)
        .findOne({ Email: email })
        .then((status) => {
          console.log(status);
          if (status) {
            resolve({ status: true });
          } else {
            resolve({ status: false });
          }
        });
    });
  },
  getBoxData: (id) => {
    return new Promise(async (resolve, reject) => {
      var showsFromShowCollection = await db
        .get()
        .collection(collection.SHOW_COLLECTION)
        .find({ ownerId: objectId(id) })
        .toArray();

      var bookings = await db
        .get()
        .collection(collection.BOOKING_COLLECTION)
        .find()
        .toArray();
      console.log(showsFromShowCollection);

      var thisOwnerBookings = [];

      for (var i = 0; i < bookings.length; i++) {
        for (var j = 0; j < showsFromShowCollection.length; j++) {
          if (bookings[i].Show._id === showsFromShowCollection[j]._id) {
            thisOwnerBooking.push(bookings[i]);
            console.log(bookings[i], "boking");
          } else {
            thisOwnerBookings.push(0)
          }
        }
      }
      console.log(thisOwnerBookings);
    });
  },

  forgotPasswordUpdateNewPassword: (email, password) => {
    return new Promise(async (resolve, reject) => {
      password = await bcrypt.hash(password, 10)
      db.get().collection(collection.OWNER_COLLECTION).updateOne({ Email: email }, {
        $set: {
          Password: password
        }
      }).then((response) => {
        resolve(response)
      })
    })
  }
};
