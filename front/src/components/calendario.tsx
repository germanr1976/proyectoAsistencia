import { useState } from "react";

const CalendarDropdown = () => {
    const [selectedDate, setSelectedDate] = useState("");
    const [attendanceRecords, setAttendanceRecords] = useState<string[]>([]);

    const saveAttendance = (dateTime: string) => {
        // Simula guardar la asistencia en una base de datos
        // Aquí puedes hacer una llamada a tu API para guardar los datos en el servidor

        // Agrega la fecha y hora seleccionada al estado
        setAttendanceRecords([...attendanceRecords, dateTime]);
        console.log("Asistencia guardada:", dateTime);
    };

    const handleSave = () => {
        if (selectedDate) {
            saveAttendance(selectedDate);
            alert(`Fecha y hora guardadas: ${selectedDate}`);
            // Limpiar la selección después de guardar
            setSelectedDate("");
        } else {
            alert("Por favor, selecciona una fecha y hora.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="p-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Seleccionar Fecha y Hora</h1>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="datetime">
                        Fecha y hora:
                    </label>
                    <input
                        type="datetime-local"
                        id="datetime"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={handleSave}
                >
                    Guardar Fecha y Hora
                </button>
            </div>

            <div className="mt-6">
                <h2 className="text-xl font-bold">Registros de Asistencia</h2>
                <ul className="mt-2">
                    {attendanceRecords.map((record, index) => (
                        <li key={index} className="text-gray-700">
                            {record}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CalendarDropdown;