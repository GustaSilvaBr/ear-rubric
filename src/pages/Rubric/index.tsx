import { useState, useEffect } from "react";
import "./styles.scss";

interface Student {
    name: string;
    score: number;
    link: string;
}

export function Rubric() {
    const [studentName, setStudentName] = useState<string>("");
    const [studentScores, setStudentScores] = useState<Student[]>([]);

    useEffect(() => {
        localStorage.setItem("studentScores", JSON.stringify(studentScores));
    }, [studentScores]);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStudentName(e.target.value);
    };

    const calculateScore = () => {
        if (!studentName.trim()) {
            alert("Please enter the student's name.");
            return;
        }

        let totalScore = 0;
        let rubricCode = "";
        document.querySelectorAll("tr").forEach((row) => {
            const selectedCell = row.querySelector("td.selected") as HTMLTableCellElement | null;
            if (selectedCell) {
                totalScore += parseInt(selectedCell.getAttribute("data-points") || "0");
                rubricCode += (selectedCell.cellIndex - 1);
            }
        });

        const rawData = `${rubricCode}|${totalScore}|${studentName}`;
        const encodedData = btoa(unescape(encodeURIComponent(rawData))); // Base64 encode
        const studentLink = `studentGrade.html?data=${encodedData}`;

        const newStudent: Student = { name: studentName, score: totalScore, link: studentLink };
        setStudentScores([...studentScores, newStudent]);
        setStudentName("");

        document.querySelectorAll("td.selected").forEach((td) => td.classList.remove("selected"));
    };

    const clearAll = () => {
        localStorage.removeItem("studentScores");
        setStudentScores([]);
    };

    return (
        <div className="rubric-container">
            <div className="rubric-content">
                <div className="rubric-table-container">
                    <div className="input-section">
                        <input
                            type="text"
                            value={studentName}
                            onChange={handleNameChange}
                            placeholder="Enter student name"
                            className="form-control"
                        />
                        <button className="btn btn-danger" onClick={calculateScore}>
                            Add Student
                        </button>
                    </div>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>CATEGORY</th>
                                <th>Excede as expectativas (25)</th>
                                <th>Atende as expectativas (20)</th>
                                <th>Progredindo (15)</th>
                                <th>Progresso limitado (10)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { category: "Conceito", scores: ["Deep understanding", "Good understanding", "Partial understanding", "No understanding"] },
                                { category: "Atitude", scores: ["Exemplary behavior", "Good interaction", "Some difficulties", "Inadequate attitude"] },
                                { category: "Procedimento", scores: ["High precision", "Good execution", "Needs support", "No engagement"] },
                                { category: "Prontidão", scores: ["Always prepared", "Almost always", "Often unprepared", "Rarely prepared"] },
                            ].map((row, index) => (
                                <tr key={index}>
                                    <td>{row.category}</td>
                                    {row.scores.map((score, i) => (
                                        <td
                                            key={i}
                                            data-points={(25 - i * 5)}
                                            onClick={(e: React.MouseEvent<HTMLTableCellElement>) => {
                                                e.currentTarget.parentElement
                                                    ?.querySelectorAll("td")
                                                    .forEach((cell) => cell.classList.remove("selected"));
                                                e.currentTarget.classList.add("selected");
                                            }}
                                        >
                                            {score}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="student-scores-container">
                    <h4>Student Scores</h4>
                    <button className="btn btn-warning" onClick={clearAll}>
                        Clear All
                    </button>
                    <div className="mt-4">
                        {studentScores.map((student, index) => (
                            <div key={index} className="student-entry">
                                <strong>{student.name}</strong> - {student.score} points.
                                <a href={student.link} target="_blank" rel="noopener noreferrer">
                                    {" "}
                                    Report
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}