export interface wishListProps {
  id: number;
  title: string;
  image: string;
  price: string;
}

export const handleAddToWishList = (id: number, array: wishListProps[]) => {
  const storedArray = JSON.parse(localStorage.getItem("wishList") || "[]");
  const itemObject = array.find((item) => item.id === id);

  if (storedArray.some((item: wishListProps) => item.id === id)) {
    const updatedArray = storedArray.filter(
      (item: wishListProps) => item.id !== id
    );
    localStorage.setItem("wishList", JSON.stringify(updatedArray));
  } else {
    storedArray.push(itemObject);
    localStorage.setItem("wishList", JSON.stringify(storedArray));
  }
};
