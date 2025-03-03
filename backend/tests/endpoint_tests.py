import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import unittest
from fastapi.testclient import TestClient
from app import main, schema
import json

class TestEndPoints(unittest.TestCase):
    def setUp(self):
        self.client = TestClient(main.app)
        
        test_task = schema.TaskCreate(title="first-post-test", description="creating-test", completed=True, date="", dateString="-")
        response = self.client.post("/tasks", json=test_task.model_dump())


    def test_invalid_endpoint(self):
        response = self.client.get("/invalid")
        self.assertEqual(response.status_code, 404)
        
        test_task = schema.TaskCreate(title="Test post", description="Checking for invalid endpoint", completed=True, date="", dateString="-")
        response = self.client.post("/invalid", json=test_task.model_dump())
        self.assertEqual(response.status_code, 404)
    
    
    def test_valid_endpoints(self):
        response = self.client.get("/tasks")
        self.assertEqual(response.status_code, 200)
        
        response = self.client.get("/tasks")
        self.assertEqual(response.status_code, 200)
    
        response = self.client.get("/tasks/1")
        self.assertEqual(response.status_code, 200)
        
        test_task = schema.TaskCreate(title="Test post", description="Checking for creating task endpoint", completed=True, date="", dateString="-")
        response = self.client.post("/tasks", json=test_task.model_dump())
        self.assertEqual(response.status_code, 200)
        
        test_task = schema.TaskCreate(title="Test post", description="Checking for updating endpoint", completed=True, date="", dateString="-")
        response = self.client.put("/tasks/1", json=test_task.model_dump())
        self.assertEqual(response.status_code, 200)
        
        response = self.client.delete("/tasks/1")
        self.assertEqual(response.status_code, 200) 
        
    
    def test_response_types(self):
        response = self.client.get("/tasks")
        self.assertEqual(response.status_code, 200)
        data:list = json.load(response)
        data:dict = data[0]
        
        self.assertEqual(type(data['title']), str)
        self.assertEqual(type(data['id']), int)
        self.assertEqual(type(data['description']), str)
        self.assertEqual(type(data['completed']), bool)
        self.assertEqual(type(data['date']), str)
        self.assertEqual(type(data['datestring']), str)
        
        
    def test_getTasks(self):
        response = self.client.get("/tasks")
        data:list = json.load(response)
        self.assertEqual(type(data), list)
    
    def test_getTask(self):
        response = self.client.get("/tasks")
        data:list = json.load(response)
        data:dict = data[-1]
        id = data['id']
        
        response = self.client.get(f"/tasks/{id}")
        data:list = json.load(response)
        self.assertEqual(type(data), list)
        data = data[0]
        self.assertEqual(id, data['id'])
        
    
    def test_postTask(self):
        test_task = schema.TaskCreate(title="Test create post", description="Checking for creating task endpoint", completed=True, date="", dateString="-")
        
        response = self.client.post("/tasks", json=test_task.model_dump())
        self.assertEqual(response.status_code, 200)
        
        data:list = json.load(response)
        title = data['title']
        description = data['description']
        
        self.assertEqual(title, "Test create post")
        self.assertEqual(description, "Checking for creating task endpoint")
        
        
    def test_updateTask(self):
        test_task = schema.TaskCreate(title="Test update request", description="Checking for updating task endpoint", completed=True, date="", dateString="-")
        response = self.client.post("/tasks", json=test_task.model_dump())
        self.assertEqual(response.status_code, 200)
        
        response = self.client.get("/tasks")
        data:list = json.load(response)
        data:dict = data[-1]
        id = data['id']
        
        test_task = schema.TaskCreate(title="updated request", description="Checking for updating task endpoint", completed=True, date="", dateString="-")
        response = self.client.put(f"/tasks/{id}", json=test_task.model_dump())
        self.assertEqual(response.status_code, 200)
        self.assertEqual(json.load(response), "UPDATE 1")
        
        
    def test_deleteTask(self):
        test_task = schema.TaskCreate(title="Test delete request", description="Checking for deleting task endpoint", completed=True, date="", dateString="-")
        response = self.client.post("/tasks", json=test_task.model_dump())
        self.assertEqual(response.status_code, 200)
        
        response = self.client.get("/tasks")
        data:list = json.load(response)
        data:dict = data[-1]
        id = data['id']
        
        response = self.client.delete(f"/tasks/{id}")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(json.load(response), True)
        

if __name__ == "__main__":
    unittest.main()
