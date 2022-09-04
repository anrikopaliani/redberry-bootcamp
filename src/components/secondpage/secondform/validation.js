export const validate = (values) => {
  const errors = {};

  const laptopNameRegex = /^[a-zA-Z0-9!@#$%^&*()_+=]*$/;
  const onlyNumbers = /^[0-9]*$/;
  // ONLY TYPE DD/MM/YYYY
  const dateRegex =
    /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|(([1][26]|[2468][048]|[3579][26])00))))$/;

  // YOU CAN TYPE DD-MM-YYYY, DD/MM/YYYY, DD.MM.YYYY
  const newDateRegex = /^\d{2}([./-])\d{2}\1\d{4}$/;

  if (!values.laptop_name) {
    errors.laptop_name = "error";
  } else if (!laptopNameRegex.test(values.laptop_name)) {
    errors.laptop_name = "error";
  }

  if (!values.laptop_brand_id) {
    errors.laptop_brand_id = "error";
  }

  if (!values.laptop_cpu) {
    errors.laptop_cpu = "error";
  }

  if (!values.laptop_cpu_cores) {
    errors.laptop_cpu_cores = "error";
  } else if (!onlyNumbers.test(values.laptop_cpu_cores)) {
    errors.laptop_cpu_cores = "error";
  }

  if (!values.laptop_cpu_threads) {
    errors.laptop_cpu_threads = "error";
  } else if (!onlyNumbers.test(values.laptop_cpu_threads)) {
    errors.laptop_cpu_threads = "error";
  }

  if (!values.laptop_ram) {
    errors.laptop_ram = "error";
  } else if (!onlyNumbers.test(values.laptop_ram)) {
    errors.laptop_ram = "error";
  }

  if (!values.laptop_hard_drive_type) {
    errors.laptop_hard_drive_type = "error";
  }

  if (!values.laptop_price) {
    errors.laptop_price = "error";
  } else if (!onlyNumbers.test(values.laptop_price)) {
    errors.laptop_price = "error";
  }

  if (!values.laptop_state) {
    errors.laptop_state = "error";
  }

  if (
    values.laptop_purchase_date &&
    !newDateRegex.test(values.laptop_purchase_date)
  ) {
    errors.laptop_purchase_date = "error";
  }

  if (!values.laptop_image) {
    errors.laptop_image = "error";
  }

  return errors;
};
