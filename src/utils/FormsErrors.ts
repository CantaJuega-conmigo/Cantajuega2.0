const Regex = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,30}$/,
  password: {
    general:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>`~;'/+-=]).{8,30}$/,
    passwordletterMay: /(?=.*[A-Z])/,
    passwordletterMin: /(?=.*[a-z])/,
    passwordletterChar: /(?=.*[!@#$%^&*(),.?":{}|<>`~;'/+-=])/,
  },
  firstName: /^[a-zA-Z]+$/,
  lastName: /^[a-zA-Z]+$/,
};

interface ErrorProps {
  email?: string;
  password?: string;
  global?: string;
  firstName?: string;
  lastName?: string;
}
export interface inputErrorChilds {
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  gender?: string;
}
export interface InputChilds {
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: 'male' | 'female';
}

interface BodyStage {
  name: string;
  description: string;
  minAge: any;
  maxAge: any;
  content: {
    pdf?: { name: string; content: string };
    videos: any[];
    musics: null[];
  };
}

interface ErrorsStage {
  global: string;
  stageName: string;
  stageDescription: string;
  minAge: string;
  maxAge: string;
}

export const loginError = (input: any) => {
  const error: ErrorProps = {};
  if (input.email === '' || input.password === '') {
    error.global = 'Todos los campos son obligatorios';
  }
  if (!input.email.length) {
    error.email = 'Ingrese email.';
  } else if (!Regex.email.test(input.email)) {
    error.email = 'El email no es valido';
  }
  if (!input.password) {
    error.password = 'Ingrese una contraseña.';
  } else if (input.password.length < 8) {
    error.password = 'Debe contener al menos 8 caracteres.';
  } else if (input.password.length > 30) {
    error.password = 'Contraseña muy larga.';
  } else if (!Regex.password.passwordletterMay.test(input.password)) {
    error.password = 'Debe contener al menos una mayúscula.';
  } else if (!Regex.password.passwordletterMin.test(input.password)) {
    error.password = 'Debe contener al menos una minúscula.';
  } else if (!Regex.password.passwordletterChar.test(input.password)) {
    error.password = 'Debe contener al menos un caracter especial.';
  } else if (!Regex.password.general.test(input.password)) {
    error.password = 'Contraseña inválida.';
  }
  return {
    anyError: Object.keys(error).length,
    errors: error,
  };
};
export const registerErrorUser = (input: any) => {
  const error: ErrorProps = {};
  if (
    input.email === '' ||
    input.password === '' ||
    !input.firstName ||
    !input.lastName
  ) {
    error.global = 'Todos los campos son obligatorios';
  }

  if (!input.email.length) {
    error.email = 'Ingrese email.';
  } else if (!Regex.email.test(input.email)) {
    error.email = 'El email no es valido';
  }

  if (!input.password) {
    error.password = 'Ingrese una contraseña.';
  } else if (input.password.length < 8) {
    error.password = 'Debe contener al menos 8 caracteres.';
  } else if (input.password.length > 30) {
    error.password = 'Contraseña muy larga.';
  } else if (!Regex.password.passwordletterMay.test(input.password)) {
    error.password = 'Debe contener al menos una mayúscula.';
  } else if (!Regex.password.passwordletterMin.test(input.password)) {
    error.password = 'Debe contener al menos una minúscula.';
  } else if (!Regex.password.passwordletterChar.test(input.password)) {
    error.password = 'Debe contener al menos un caracter especial.';
  } else if (!Regex.password.general.test(input.password)) {
    error.password = 'Contraseña inválida.';
  }

  if (!input.firstName) {
    error.firstName = 'Ingrese su nombre.';
  } else if (!Regex.firstName.test(input.firstName)) {
    error.firstName = 'Nombre solo debe tener letras';
  }

  if (!input.lastName) {
    error.lastName = 'Ingrese su apellido.';
  } else if (!Regex.lastName.test(input.lastName)) {
    error.lastName = 'Apellido solo debe tener letras';
  }
  return {
    anyError: Object.keys(error).length > 0,
    errors: error,
  };
};

export const registerErrorChild = (input: InputChilds) => {
  let error: inputErrorChilds = {};
  if (!input.firstName) {
    error.firstName = 'Ingrese el nombre de su hijo/hija.';
  }
  if (input.firstName.length < 3) {
    error.firstName = 'El nombre debe tener al menos 3 caracteres.';
  }
  if (input.lastName.length < 3) {
    error.lastName = 'El apellido debe tener al menos 3 caracteres.';
  }
  if (!input.lastName) {
    error.lastName = 'Ingrese el apellido de su hijo/hija.';
  }
  if (!input.birthDate) {
    error.birthDate = 'Ingrese la fecha de nacimiento de su hijo/hija.';
  }
  if (!input.gender) {
    error.gender = 'Ingrese el genero de su hijo/hija.';
  }
  if (input.birthDate > new Date().toISOString().split('T')[0]) {
    error.birthDate =
      'La fecha de nacimiento no puede ser mayor a la fecha actual.';
  }
  // if (input.birthDate < "1900-01-01") {
  //   error.birthDate = "La fecha de nacimiento no puede ser menor a 1900-01-01.";
  // }
  const today = new Date();
  const maxAge = 18;
  // if (
  //   input.birthDate <
  //   new Date(today.getFullYear() - maxAge, today.getMonth(), today.getDate())
  //     .toISOString()
  //     .split("T")[0]
  // ) {
  //   error.birthDate = "La edad minima es de 18 años.";
  // }
  if (
    input.gender !== 'male' &&
    input.gender !== 'female' &&
    input.gender !== 'other'
  ) {
    error.gender = 'Ingrese una opcion valida.';
  }

  return {
    anyError: Object.keys(error).length > 0,
    errors: error,
  };
};

export const createStageErrors = (body: BodyStage): ErrorsStage => {
  const { name, description, minAge, maxAge, content } = body;
  const errors = {
    global: '',
    stageName: '',
    stageDescription: '',
    minAge: '',
    maxAge: '',
  };
  if (
    !name ||
    !description ||
    !minAge ||
    !maxAge ||
    content.videos.length < 5
  ) {
    errors.global = 'Todos los campos son obligatorios menos los de pdf';
  }

  if (!name.length) errors.stageName = 'No puede estar vacio';
  if (name.length < 3) errors.stageName = 'Minimo 3 caracteres';
  if (name.length > 25) errors.stageName = 'Maximo 25 caracteres';

  if (!description.length) errors.stageDescription = 'No puede estar vacio';
  if (description.length < 3) errors.stageDescription = 'Minimo 3 caracteres';
  if (description.length > 25) errors.stageDescription = 'Maximo 25 caracteres';

  if (!minAge) errors.minAge = 'No puede estar vacio';
  if (parseInt(minAge) > parseInt(maxAge))
    errors.minAge = 'No puede ser mayor que la máxima';

  if (!maxAge) errors.maxAge = 'No puede estar vacio';
  if (parseInt(maxAge) < parseInt(minAge))
    errors.maxAge = 'No puede ser menor que la minima';
  if (minAge && maxAge && parseInt(minAge) === parseInt(maxAge)) {
    errors.minAge = 'No puede ser igual a la minima';
    errors.maxAge = 'No puede ser igual a la minima';
  }

  return errors;
};
