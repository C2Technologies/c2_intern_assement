from setuptools import setup, find_packages

setup(
    name="To-do-list-app",
    version="0.1.0",
    description="A sample Python project",
    author="Ernest Matshabe",
    author_email="ematshabe023@student.wethinkcode.co.za",
    packages=find_packages(),
    install_requires=[
        "fastapi",
        "uvicorn",
        "asyncpg",
        "httpx",
    ],
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires=">=3.6",
)