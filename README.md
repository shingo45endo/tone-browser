
tone-browser
============

Tone parameters of multi-timbre MIDI sound modules in the 90's.


What is this?
-------------

This application displays the tone parameters of 90's multi-timbre MIDI sound modules (mainly General MIDI compliant). The following modules are supported:

* Roland
	* SC-8820
	* SC-88Pro
	* SC-88VL
	* SC-88
	* PMA-5
	* XP-10
	* SC-55mkII
	* SC-33
	* SC-55 Ver.2.00 / Ver.1.20 / Ver.1.00
	* RA-90
	* CM-32L
* Yamaha
	* MU2000EX
	* MU1000EX
	* MU128 Ver.2.00
	* MU100
	* MU90
	* MU80
	* MU50
	* TG300
	* TG100
	* MU5
	* QY22
	* QY20
* Korg
	* NS5R
	* X5DR
	* 05R/W
	* AG-10
* Kawai
	* GMega
* Casio
	* GZ-70SP
* Akai
	* SG01k


What does "Tone Parameters" mean?
---------------------------------

Unlike typical PCM synthesizers, most of these low-priced products do not support the feature to create original tones from scratch. However, they are designed internally similar to PCM synthesizer, and their preset tones are composed of a large number of parameters. This application can browse such internal parameters.

This section describes what parameters a single "Tone" consists of in typical PCM synthesizers. The term "Tone" here refers to the one can be selected by the program change event. (It is also expressed as "Instrument", "Timbre", "Voice", "Program", or "Patch" depending on the manufacturer and device.)

* A "Tone" is composed of 1~4 "Voice" slots.
	* The term "Voice" is also expressed as "Partial", "Element", or "OSC" depending on the manufacturer and device.
* Each "Voice" has many parameters:
	* "Wave" number: The most important parameter for PCM synthesizers.
	* Envelopes: Typically, for pitch, filter, and amplitude.
	* LFOs: Typically, for pitch, filter, and amplitude.
	* Velocity range: Used to switch "Voice" according to velocity values. (velocity switch)
	* Key range: Used to switch "Voice" according to note number. (split)
	* Etc.
* Each "Wave" is composed of multi "Samples".
	* It is common to sample sounds in multiple key scales to represent a single instrument.
	* As for percussions, they often consist of only a single "Sample".
* Each "Sample" has information about which address in the PCM wave ROM the wave data is stored.
	* Generally, it contains the information about "loop point". (except for "one-shot" samples)

In addition, some sound modules support the feature to combine multiple "Tones" into a single "Combination" tone. (It is also expressed as "Performance" or "Single" depending on the manufacturer and device.)


License
-------

MIT


Author
------

[shingo45endo](https://github.com/shingo45endo)
