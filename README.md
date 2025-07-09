# Aquaterra Studio · Pilates & Yoga

Este proyecto es una aplicación web para la reserva de clases de Pilates y Yoga, desarrollada para **Aquaterra Studio**.
Permite a los usuarios registrarse, iniciar sesión, reservar clases, cancelar reservas y gestionar cupos en tiempo real.

## 🧘‍♀️ Descripción

Aquaterra Studio es un espacio dedicado al bienestar físico y mental. La app permite:
- Mostrar un calendario de clases del mes en curso.
- Permitir a los usuarios reservar hasta 8 clases mensuales.
- Control de cupos en tiempo real.
- Panel de administrador para gestionar reservas y notificaciones.
- Integración con Firebase para autenticación y base de datos.

## 🚀 Tecnologías utilizadas

- **React**: Librería principal para el frontend.
- **Firebase**: Autenticación, Firestore Database y Hosting.
- **React Router**: Navegación entre rutas.
- **React Context API**: Gestión global de estados de reserva.
- **React Toastify**: Notificaciones de usuario.
- **SweetAlert2**: Modales de confirmación elegantes.
- **CSS Modules**: Estilos personalizados.

  ## 🔒 Autenticación

- Los usuarios deben registrarse o iniciar sesión para acceder a sus clases.
- El estado de autenticación se gestiona con Firebase Auth.
- Los datos de reserva se guardan por usuario en Firestore.

## 📅 Reservas

- Cada usuario puede reservar un máximo de **8 clases por mes**.
- Los cupos se actualizan automáticamente.
- El usuario puede cancelar reservas desde su panel.

   ✅ Pruebas de Compatibilidad

Se verificó el funcionamiento de la app **Aquaterra Studio** en:
- 📱 **Móviles**: interfaz clara, reservas y botones accesibles.
- 💻 **Tablets**: layout responsive sin cortes ni desbordes.
- 🖥️ **Escritorio**: panel admin y calendario correctamente alineados.
- ⚡ **Tiempos de carga**: óptimos, sin demoras significativas.
