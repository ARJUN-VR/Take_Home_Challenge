export const createMarkDown = (projectName, todos) => {
    try {

        const completedTodos = todos.filter((todo) => todo.status === true);
        const pendingTodos = todos.filter((todo) => todo.status === false);
        const completedTodosCount = completedTodos.length;
    
        let markDown = `# ${projectName}\n\n## Summary: ${completedTodosCount}/${todos.length} todos completed\n\n### Pending\n\n`;
        pendingTodos.forEach((todo) => {
          markDown += `- [ ] ${todo.description}\n`;
        });
    
        markDown += `\n### Completed\n\n`;
        completedTodos.forEach((todo) => {
          markDown += `- [x] ${todo.description}\n`;
        });
        console.log(`Markdown file for ${projectName} created successfully!`);

        return markDown;


    
        
    } catch (error) {
        console.log(error)
        throw error
    }
}