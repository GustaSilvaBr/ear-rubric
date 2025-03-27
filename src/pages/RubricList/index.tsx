import './styles.scss';

export function RubricList() {
    const rubrics = [
        { name: "Math Rubric", class: "7th Grade", teacher: "Mr. Smith", image: "https://via.placeholder.com/250" },
        { name: "Science Rubric", class: "8th Grade", teacher: "Ms. Johnson", image: "https://via.placeholder.com/250" },
        { name: "English Rubric", class: "9th Grade", teacher: "Mr. Lee", image: "https://via.placeholder.com/250" }
    ];

    return (
        <div className="content">
            <div className="rubric-title">Rubrics Already Created</div>
            <div className="rubrics-container">
                {rubrics.map((rubric, index) => (
                    <div className="card" key={index}>
                        <img src={rubric.image} alt={rubric.name} />
                        <div className="card-body">
                            <h5>{rubric.name}</h5>
                            <p>Class: {rubric.class}</p>
                            <p>Teacher: {rubric.teacher}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
