module.exports = {
  server: "https://backend-quanlynhatro-online.herokuapp.com/",
  formatDate: (date) => {
    var d = new Date(date);
    var datestring =
      d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
    return datestring;
  },
  currencyFormat: num => {
    return num.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  },
};
