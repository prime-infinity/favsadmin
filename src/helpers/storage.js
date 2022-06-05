export const saveToLocal = (user) => {
  try {
    const serialisedState = JSON.stringify(user);
    localStorage.setItem("favadminmauth", serialisedState);
  } catch (e) {
    console.warn(e);
  }
};

export const loadFromLocal = () => {
  try {
    const userInLocal = localStorage.getItem("favadminmauth")
      ? JSON.parse(localStorage.getItem("favadminmauth"))
      : null;
    return userInLocal;
  } catch (e) {
    console.warn(e);
    return null;
  }
};

export const removeFromLocal = () => {
  localStorage.removeItem("favadminmauth");
};
