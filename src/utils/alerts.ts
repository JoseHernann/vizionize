import Swal from 'sweetalert2';

export async function showSmallErrorToast(message: string) {
  const smallToast = Swal.mixin({
    toast: true,
    position: 'bottom-left',
    iconColor: 'red',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });
  await smallToast.fire({
    icon: 'error',
    title: message,
  });
}

export async function showSmallWarningToast(message: string) {
  const smallToast = Swal.mixin({
    toast: true,
    position: 'bottom-right',
    iconColor: 'yellow',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });
  await smallToast.fire({
    icon: 'warning',
    title: message,
  });
}

export async function showSmallSuccessToast(message: string) {
  const smallToast = Swal.mixin({
    toast: true,
    position: 'bottom-right',
    iconColor: 'green',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });
  await smallToast.fire({
    icon: 'success',
    title: message,
  });
}

export async function showLargeErrorToast(message: string) {
  const largeToast = Swal.mixin({
    toast: false,
    position: 'center',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });

  await largeToast.fire({
    icon: 'error',
    title: 'Oops...',
    text: message,
  });
}
