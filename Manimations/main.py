from manim import *
import numpy as np
import cv2

config.frame_size = (1080, 1920)
config.frame_width = 20

class Something(Scene):
    def construct(self):
        circle = Circle()
        self.play(Create(circle))
        self.wait()
        square = Square()
        self.play(Transform(circle, square), run_time=2)
        self.wait()
        self.play(ApplyMethod(circle.shift, LEFT))
        self.play(ApplyMethod(circle.rotate, -1))
        self.play(ApplyMethod(circle.scale, 0.5))
        self.wait(5)

class count(Scene):
    def construct(s):
        num = Text("0")
        for i in range(10):
            s.play(Transform(num, Text(str(i))))
        s.play(ShowCreationThenFadeOut(Rectangle(BLUE_D, 2, 3)))
        
class intro(Scene):
    def construct(self):

        sin_func_1 = FunctionGraph(
            lambda t: np.sin(t/1.5) * 1,
            color=BLUE,
        )

        text = Text("Well").scale(2)
        self.play(Write(text), run_time=0.25)
        self.wait(0.5)
        self.play(RemoveTextLetterByLetter(text), run_time=0.25)
        self.wait(0.5)
        text = Text("I've Made Some Changes").scale(2)
        self.play(Write(text), run_time=0.5)
        self.wait(1.5)
        self.play(RemoveTextLetterByLetter(text), run_time=0.25)
        self.wait(0.5)
        circle = Circle().scale(2)
        self.play(Create(circle))
        self.wait()
        square = Square().scale(2)
        self.play(Transform(circle, square))
        self.wait()
        self.play(ApplyMethod(circle.rotate, 45*(np.pi/180)), run_time=0.3)
        self.play(ApplyMethod(circle.scale, 0.5))
        self.wait(0.5)
        self.play(Transform(circle, Line((-15, 0, 0), (15, 0, 0))))
        self.play(Create(sin_func_1), run_time=1)
        self.wait(2)
        self.play(FadeOut(circle), FadeOut(sin_func_1), Create(Code('code.js', tab_width=20, background="window", language="JavaScript", font="Times New Roman", style="monokai").scale(2)), run_time=0.7)
        self.wait(2)

        image = ImageMobject('3b1b.webp').scale(2)

        self.add(image)
        self.wait(1)
        