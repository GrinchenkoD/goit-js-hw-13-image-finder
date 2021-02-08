export default {
  key: "20201719-2c6bddc3b6de2ae59c417e3e6",
  page: 1,
  searchPictures(searchQuery) {
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${this.page}&per_page=12&key=${this.key}`;
    //
    return fetch(url).then((res) => {
      if (res.status == 200) {
        this.page += 1;
        return res.json();
      } else {
        throw new Error(res.status);
      }
    });
  },
  setDefaultPage() {
    this.page = 1;
  },
};
