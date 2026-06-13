const USERS_KEY = "food_app_users";

export const getUsers = () => {
  const raw = localStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : [];
};

// ← street, city, state اضافه شد
export const registerUser = (
  name,
  email,
  password,
  street = "",
  city = "",
  state = "",
) => {
  const users = getUsers();
  const exists = users.find((u) => u.email === email);
  if (exists)
    return { success: false, message: "این ایمیل قبلاً ثبت شده است." };

  const newUser = { name, email, password, street, city, state };
  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return { success: true, user: newUser };
};

export const loginUser = (email, password) => {
  const users = getUsers();
  const user = users.find((u) => u.email === email);
  if (!user) return { success: false, message: "ایمیل یافت نشد." };
  if (user.password !== password)
    return { success: false, message: "رمز عبور اشتباه است." };
  return { success: true, user };
};
