module.exports = {
  server: "https://backend-quanlynhatro-online.herokuapp.com/",
  formatDate: (date) => {
    var d = new Date(date);
    var datestring =
    ("0" + d.getDate()).slice(-2) + "/" + ("0" + (d.getMonth() + 1)).slice(-2) + "/" + d.getFullYear();
    return datestring;
  },

  formatFullDate: (date) => {
    var d = new Date(date);
    var datestring =
    ("0" + d.getDate()).slice(-2) + "/" + ("0" + (d.getMonth() + 1)).slice(-2) + "/" + d.getFullYear();
    var timestring = ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2)
    return timestring + " " + datestring;
  },

  currencyFormat: (num) => {
    return num.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  },
};
