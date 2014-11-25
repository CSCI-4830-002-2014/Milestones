# Milestone Template

## Which Project?
[url to your project's github page](https://github.com/develra/Hackathon_Final)
this is temporary - i'll change it when my group gets a repo set up

## Milestone Number
[1]

## Who Worked on this submission?
* Michael Aaron

## Describe what you're submitting
This milestone is an initial python script that takes wav files less than 30 seconds and converts them to a text file
I am relying on the google API Speech Recognition at the moment; i'll explore sphinx if it becomes nessesary - I have
had a very high level of success with the files I have attempted to use thus far.
* I fixed the broken speech recognition library at https://github.com/Uberi/speech_recognition/pull/16
* I wrote a short bash script that takes arbitrarily lengthed wav files and cuts them up in 29 second chunks
* I write to a text file in the style ryan and I had agreed upon


## Code and Screenshots
[Please link in relevant code and screenshots of functionality including a short explanation]
* [code link](https://github.com/develra/Hackathon_Final/blob/master/wav2text_initial.py) --> a simple python script that uses Google API SR to convert wav files to a text file
* you will need to install the speech recognition library from my repo at
[Develra's speech recognition](https://github.com/develra/speech_recognition) as the pip version is currently broken.  
