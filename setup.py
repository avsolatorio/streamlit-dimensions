from os.path import dirname
from os.path import join
import setuptools

def readme() -> str:
    """Utility function to read the README file.
    Used for the long_description.  It's nice, because now 1) we have a top
    level README file and 2) it's easier to type in the README file than to put
    a raw string in below.
    :return: content of README.md
    """

    return open(join(dirname(__file__), "README.md")).read()


setuptools.setup(
    name="streamlit-dimensions",
    version="0.0.1",
    author="Aivin V. Solatorio",
    author_email="avsolatorio@gmail.com",
    description="A simple component that returns the dimensions of the container where it is rendered.",
    long_description=readme(),
    long_description_content_type="text/markdown",
    url="https://github.com/avsolatorio/streamlit-dimensions",
    packages=setuptools.find_packages(),
    include_package_data=True,
    classifiers=[],
    python_requires=">=3.6",
    install_requires=[
        # By definition, a Custom Component depends on Streamlit.
        # If your component has other Python dependencies, list
        # them here.
        "streamlit >= 0.63",
    ],
)
