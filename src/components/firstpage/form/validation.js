export const validate = (values) => {
  const errors = {};
  // REGEX FOR ONLY GEORGIAN LANGUAGE
  const regex = /^[აბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰ ]+$/;
  // REGEX FOR PHONE NUMBER IN GEORGIAN NUMBER FORMAT  (+995 123 45 67 89) (+995 123456789) (+995123456789)
  const phoneRegex = /^\+995 ?[\d]{3} ?[\d]{2} ?[\d]{2} ?[\d]{2} ?$/;
  // VALIDATE NAME INPUT
  if (!values.name) {
    errors.name = "error";
  } else if (!regex.test(values.name)) {
    errors.name = "error";
  } else if (values.name.length < 2) {
    errors.name = "error";
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
    errors.email = "error";
  } else if (!values.email.endsWith("@redberry.ge")) {
    errors.email = "error";
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
  if (!values.phone_number) {
    errors.phone_number = "required";
  } else if (!phoneRegex.test(values.phone_number)) {
    errors.phone_number = "უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს";
  }

  return errors;
};
