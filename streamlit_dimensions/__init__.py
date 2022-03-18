import os
import streamlit.components.v1 as components

_RELEASE = True

if not _RELEASE:
    _component_func = components.declare_component(
        "st_dimensions",
        url="http://localhost:3001",
    )
else:
    parent_dir = os.path.dirname(os.path.abspath(__file__))
    build_dir = os.path.join(parent_dir, "frontend/build")
    _component_func = components.declare_component("st_dimensions", path=build_dir)


def st_dimensions(key=None):
    return _component_func(key=key)


if not _RELEASE:
    import streamlit as st

    st.write(st_dimensions())
