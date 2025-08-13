function MainForm(props) {
    return(
        <section className="main-form">
            <form action={props.handleForm}>
                <input type="text" name="add-task" placeholder="e.g: study for exams" />
                <button>Add</button>
            </form>
        </section>
    )
}
export default MainForm