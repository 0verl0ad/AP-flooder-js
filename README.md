AP-flooder-js
=============

Script para floodear con AP falsos. 

    node AP-flooder <INTERFAZ> <ESSIDS>
    
Los ESSIDS son strings que deben de ser guardados en un archivo de texto (cada línea es un ESSID).


Requisitos
=========================

Tener instalado libpcap:

        apt-get install libpcap-dev

Tener instalada la librería pcap:

        npm install pcap
        
Tener la interfaz en modo monitor:

        airmon-ng start <INTERFAz>
        

Nota: para ejecutar AP-Flooder es necesario tener privilegios de root (usar sudo)
