export const validate = (values) => {
  const errors = {};
  // REGEX FOR ONLY GEORGIAN LANGUAGE
  const regex = /^[აბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰ ]+$/;
  //REGEX FOR EMAIL TO END WITH "@redberry.ge"
  const emailRegex = /^[a-zA-Z0-9]+@redberry.ge$/;
  // REGEX FOR PHONE NUMBER IN GEORGIAN NUMBER FORMAT
  const phoneRegex = /^\+995 ?[\d]{3} ?[\d]{2} ?[\d]{2} ?[\d]{2}$/;
  // VALIDATE NAME INPUT
  if (!values.name) {
    errors.name = "required";
  } else if (!regex.test(values.name)) {
    errors.name = "გამოიყენე ქართული ასოები";
  } else if (values.name.length < 2) {
    errors.name = "მინიმუმ 2 სიმბოლო";
  }

  // VALIDATE LASTNAME INPUT
  if (!values.surname) {
    errors.surname = "required";
  } else if (!regex.test(values.surname)) {
    errors.surname = "გამოიყენე ქართული ასოები";
  } else if (values.surname.length < 2) {
    errors.surname = "მინიმუმ 2 სიმბოლო";
  }

  // VALIDATE EMAIL INPUT
  if (!values.email) {
    errors.email = "required";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "უნდა მთავრდებოდეს @redberry.ge-თი";
  }

  // VALIDATE TEAM DROPDOWN LIST
  if (!values.team_id) {
    errors.team_id = "required";
  }

  // VALIDATE POSITIONS DROPWDOWN LIST
  if (!values.position_id) {
    errors.position_id = "required";
  }

  // VALIDATE PHONE INPUT
  if (!values.phone) {
    errors.phone = "required";
  } else if (!phoneRegex.test(values.phone)) {
    errors.phone = "უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს";
  }

  return errors;
};
