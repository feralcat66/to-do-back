const client = require('../lib/client.js');
// import our seed data:
const todos = require('./todos.js');

run();

async function run() {

    try {
        await client.connect();

        await client.query(`
                    INSERT INTO users (email, hash)
                    VALUES ($1, $2);
        `,
        ['lame@lame.com', 'whatever']);

        await Promise.all(
            todos.map(todo => {
                return client.query(`
                    INSERT INTO todos (task, complete, user_id)
                    VALUES ($1, false, $2);
                `,
                [todo.task, todo.user_id]);
            })
        );

        console.log('seed data load complete');
    }
    catch (err) {
        console.log(err);
    }
    finally {
        client.end();
    }
    
}