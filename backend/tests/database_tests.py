import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))


import unittest
import asyncpg
from app import main, schema, database

db_config = {
    'database': 'taskdb',
    'user': 'postgres',
    'password': '12345',
    'host': 'localhost',
    'port': '5432'
}


class TestDatabase(unittest.TestCase):
    async def get_connection(self):
        return await asyncpg.connect(**db_config)


    async def test_create_task(self):
        task = schema.TaskCreate(
            title = "Test Task",
            description = "This is a test description.",
            completed = False,
            date = "2025-03-02",
            dateString = "Sunday, March 2, 2025"
        )
        
        new_task = await database.create_task(task)
        self.assertIsNotNone(new_task)
        self.assertEqual(new_task["title"], "Test Task")


    async def test_get_all_tasks(self):
        task = schema.TaskCreate(
            title = "Test Task",
            description = "This is a test description.",
            completed = False,
            date = "2025-03-02",
            dateString = "Sunday, March 2, 2025"
        )
        await database.create_task(task)

        tasks = await database.get_all_tasks()
        self.assertIsInstance(tasks, dict)
        self.assertGreater(len(tasks), 0)


    async def test_get_task_by_id(self):
        task = schema.TaskCreate(
            title = "Test Task",
            description = "This is a test description.",
            completed = False,
            date = "2025-03-02",
            dateString = "Sunday, March 2, 2025"
        )
        new_task = await database.create_task(task)

        fetched_task = await database.get_task_by_id(new_task["id"])
        self.assertIsNotNone(fetched_task)
        self.assertEqual(fetched_task[0]["title"], "Find Me")


    async def test_update_task(self):
        task = schema.TaskCreate(
            title = "Test Task",
            description = "This is a test description.",
            completed = False,
            date = "2025-03-02",
            dateString = "Sunday, March 2, 2025"
        )
        new_task = await database.create_task(task)

        update_task = schema.TaskCreate(
            title = "Updated task",
            description = "This is a test description.",
            completed = False,
            date = "2025-03-02",
            dateString = "Sunday, March 2, 2025"
        )

        response = await update_task(new_task["id"], update_task)
        self.assertEqual(response, "UPDATE 1")

        fetched_task = await database.get_task_by_id(new_task["id"])
        self.assertEqual(fetched_task[0]["title"], "Updated Task")
        self.assertTrue(fetched_task[0]["completed"])


    async def test_delete_task(self):
        task = schema.TaskCreate(
            title = "Test Task",
            description = "This is a test description.",
            completed = False,
            date = "2025-03-02",
            dateString = "Sunday, March 2, 2025"
        )
        new_task = await database.create_task(task)

        response = await database.delete_task(new_task["id"])
        self.assertTrue(response)

        tasks = await database.get_all_tasks()
        self.assertFalse(any(task["id"] == new_task["id"] for task in tasks))

if __name__ == "__main__":
    unittest.main()
