const setTagAsDone = async (element, id) => {
  event.preventDefault();
  try {
    const response = await fetch(`/checklists/task/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task: { done: element.checked } }),
    });
    const data = await response.json();
    let task = data.task;
    let parent = element.parentNode;

    if (task.done) {
      element.checked = true;
      parent.classList.add("has-text-success");
      parent.classList.add("is-italic");
    } else {
      element.checked = false;
      parent.classList.remove("has-text-success");
      parent.classList.remove("is-italic");
    }
  } catch (error) {
    console.log(error);
    alert("Erro ao atualizar a tarefa");
  }
};
