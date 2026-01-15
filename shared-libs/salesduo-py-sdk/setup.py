from setuptools import setup, find_packages

setup(
    name='salesduo',
    version='0.1.0',
    packages=find_packages(),
    install_requires=[
        'fastapi>=0.68.0',
        'redis>=4.2.0',  # 4.2+ is required for redis.asyncio
        'uvicorn>=0.15.0',
        'python-dotenv>=1.0.0'
    ],
    description='Internal SalesDuo SDK',
)