#!/usr/bin/env python
from setuptools import setup

setup(
    name='Polybit radio',
    version='0.1.0',
    long_description=__doc__,
    packages=['radio'],
    include_package_data=True,
    zip_safe=False,
    install_requires=['Flask'],
    test_suite='nose.collector',
)
