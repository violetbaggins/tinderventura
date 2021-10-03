console.log("linkeoooo!!!!");

const textElement = document.getElementById('text')
const chatTextBox = document.getElementById('chat-box')
const chatTextElement = document.getElementById('chat-text')
const optionButtonsElement = document.getElementById('option-buttons')
const pFinal = document.getElementById('p-final')
const emojiFinal = document.getElementById('emoji-final')

//pantalla inicio
const buttonInicio = document.getElementById('button-inicio')
const startScreen = document.getElementById('start-screen')

// pantalla final
const buttonFinal = document.getElementById('button-final')
const finalScreen = document.getElementById('final-screen')

const containerAnswer = document.getElementById('container-answer')


let state = {}

function startGame(){
    state = {}
    showTextNode(1)
    
}

buttonInicio.addEventListener('click', function() {
    chatTextElement.innerHTML = ""
    startScreen.classList.remove('black-screen')
    startScreen.classList.add('black-screen-hidden')
    startGame()
})

buttonFinal.addEventListener('click', function() {
    chatTextElement.innerHTML = ""
    finalScreen.classList.remove('black-screen')
    finalScreen.classList.add('black-screen-hidden')
    startGame()
})

function showTextNode(textNodeIndex){
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    // textElement.innerText = textNode.text ----ESTO ES PARA QUE SALGA EL TEXT EN LA BOX DE OPCIONES
    // timer par q el mensaje aparezca despues en el div del chat. 
    setTimeout(function () {
        if(textNodeIndex <100){
            chatTextElement.innerHTML += `<p class="txt-match">${textNode.text}</p><br>`
            chatTextElement.style.opacity = 1

            if (textNode.meme){
                chatTextElement.innerHTML += `<div class="receive-meme"><img src="${textNode.meme}" width="150px"></div>`
                chatTextBox.scrollTop  = chatTextBox.scrollHeight;
            }
           

            // para que scrollee
            chatTextBox.scrollTop  = chatTextBox.scrollHeight;
        } else {
            chatTextElement.innerHTML += ``
        }
    }, 1000)

    while(optionButtonsElement.firstChild){
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }
    textNode.options.forEach(option => {
        if (showOption(option)){
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
       }     
            
   })

    
}

function showOption(option){
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option){

    const nextTextNodeId = option.nextText

    if(nextTextNodeId >= 100 ){
        const textNodeFinal = textNodes.find(textNode => textNode.id === nextTextNodeId)
        chatTextElement.innerHTML += `<p class="txt-user">${option.text}</p><br>`
        setTimeout(function () {
            if(textNodeFinal.emoji){
                emojiFinal.innerHTML = `${textNodeFinal.emoji}`
            }
            finalScreen.classList.remove('black-screen-hidden')
            finalScreen.classList.add('black-screen')
            pFinal.innerHTML = `${textNodeFinal.text}<br>`
            /* alert(textNodeFinal.text) */
        }, 500)
        
    } else {

        if (option.meme){
            chatTextElement.innerHTML += `<div class="send-meme"><img src="${option.meme}" width="150px"></div>`
        }
        chatTextElement.innerHTML += `<p class="txt-user">${option.text}</p><br>`
    }
    
    
   /*  if (nextTextNodeId <= 0){
        chatTextElement.innerHTML = ""
        return startGame()
    } */

    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
    
    // para que scrollee
    chatTextBox.scrollTop  = chatTextBox.scrollHeight;
}

const textNodes = [
    {
        id: 1,
        text: "Hola linda, td bn?",
        options: [
            {
                text: 'me estas escribiendo de un nokia 1100?',
                /* setState: {malaonda: true}, */
                nextText: 2
            },
            {
                text: 'todo bien, vos?',
                nextText: 3
            }
        ]
    },
    {
        id: 2,
        text: "jajaj, por?",
        options: [
            {
                text: "mira que no te cobran por caracter. Podes usar palabra completas, o es que queres ahorrar tiempo?",
              /*   requiredState: (currentState) => currentState.malaonda,
                setState: {malaonda: false, masmalaonda: true}, */
                nextText: 4
            },
            {
                text: "no, por nada. Vos todo bien?",
                /* requiredState: (currentState) => currentState.malaonda,
                setState: {malaonda: false, promedio: true}, */
                nextText: 3
            }

        ]
    },
    {
        id: 3,
        text: "bien, me levante hace un rato y ahora estoy por hacerme unos mates. Vi que vivimos cerca, somos vecinos. tenemos que hacer unos mates juntos",
        options: [
            {
                text: 'Si, algun dia podria ser',
                nextText: 5
            },
            {
                text: 'Tomar mate como primera cita? really?',
                nextText: 6
            }

        ]
    },
    {
        id: 4,
        text: 'jajaj me haces reir. Lo que me sobra es tiempo asi que contame, como te trata Tinder?',
        options: [
            {
                text: 'yo diria q no muy bien si todavia sigo aca, no?',
                nextText: 7
            },
            {
                text: 'y.. depende mucho con quien te encuentres. A veces male sal',
                nextText: 8
            }

        ]
    },
    {
        id: 5,
        text: 'espero que ese algun dia sea pronto',
        options: [
            {
                text: 'jaja bueno me gustaria conocerte un poquito mas antes de salir',
                nextText: 9
            },
            {
                text: 'Cuando es pronto para vos?',
                nextText: 12
            }

        ]
    },
    {
        id: 6,
        text: 'No, podemos ir a tomar una birra o a comer, lo que vos quieras. Mientras sea pronto :)',
        options: [
            {
                text: 'Cuando es pronto para vos?',
                nextText: 12
            },
            {
                text: 'Estas apurado por algo?',
                nextText: 9
            }

        ]
    },
    {
        id: 7,
        text: 'Pero que esperas encontrar aca? un novio? un chongo? un Christian Grey?',
        options: [
            {
                text: 'un sugar daddy',
                nextText: 39
            },
            {
                text: "creo que quedo bastante claro en mi msj anterior, no? Dejar de usar tinder",
                nextText: 103
            }

        ]
    },
    {
        id: 8,
        text: 'te viste con muchos de aca?',
        options: [
            {
                text: 'pff, creo q demasiados ya',
                nextText: 7
            },
            {
                text: "no, la verdad sos con el primero que hablo",
                nextText: 20
            }

        ]
    },
    {
        id: 9,
        text: "es que hablar por aca es una cagada. En vivo es mejor para conocerse. Aparte me aburre mucho el chat eterno. tenes whatsapp?",
        options: [
            {
                text: 'que te hace pensar que te lo voy a dar?',
                nextText: 10
            },
            {
                text: 'Creo q no nos estamos entendiendo',
                nextText: 11
            }

        ]
    },
    {
        id: 10,
        text: "bueno, no es para que te enojes. Solo te estaba invitando a salir. Todo bien si no queres pero si te cerras a las oportunidades nunca vas a conseguir nada",
        options: [
            {
                text: 'ay tenes razon. Como no lo habia pensado antes. Perdoname - Al proximo que matchee lo invito a casa, de una. Gracias por el consejo XD',
                meme: "https://memegenerator.net/img/images/300x300/72583845.jpg",
                nextText: 13
            },
            {
                text: 'tranqui yo no me enoje. Empecemos de nuevo, dale?',
                nextText: 103
            }

        ]
    },
    {
        id: 11,
        text: "Claramente no. Si algun dia te pinta verme, me escribis. Sos vos la que se pierde esto (mira tranqui que esta blureada)",
        meme: "https://meowmix.org/wp-content/uploads/2020/05/point-blur_may202020_140651108769634393577148..jpg",
        options: [
            {
                text: '"Gracias bro, la agrego a la coleccion" *bloquear*',
                nextText: 102
            },
            {
                text: '*unmatch*',
                nextText: 101
            }

        ]
    },
    {
        id: 12,
        text: "no se, haces algo hoy?",
        options: [
            {
                text: 'jaja bueno me gustaria conocerte un poquito mas antes de salir',
                nextText: 9
            },
            {
                text: 'ah, entiendo',
                nextText: 10
            }

        ]
    },
    {
        id: 13,
        text: "y entonces por que no me invitas a mi?",
        options: [
            {
                text: `*mandar meme de la dignidad*`,
                meme: "https://i.pinimg.com/originals/1f/c3/b1/1fc3b1976a3e94e81627369776aa4e50.jpg",
                nextText: 14
            },
            {
                text: '*clavar visto*',
                nextText: 17
            }

        ]
    },
    {
        id: 14,
        text: "jajaj Desubicada intergalactica",
        options: [
            {
                text: `*Clavar visto*`,
                nextText: 15
            },
            {
                text: 'en realidad es: desvergonzada intergalaticta',
                nextText: 16
            }

        ]
    },
    {
        id: 15,
        text: "Viste así quedan las conversaciones al pedo tener tanto mach",
        options: [
            {
                text: "y.. depende mucho con quien te encuentres. A veces male sal",
                nextText: 8
            },
            {
                text: `*Clavar visto*`,
                nextText: 105
            }

        ]
    },
    {
        id: 16,
        text: "Si ya se, pero quería ver si enganchabas la referencia",
        options: [
            {
                text: "ahh ok",
                nextText: 104
            },
            {
                text: `enserio? que nivel de vegano sos?`,
                nextText: 19
            }

        ]
    },
    {
        id: 17,
        text: "te enojaste?",
        options: [
            {
                text: "Todo bien campeon, no pasa nada",
                nextText: 101
            },
            {
                text: `*Clavar visto de nuevo*`,
                nextText: 18
            }

        ]
    },
    {
        id: 18,
        text: "Son todas iguales, despues se quejan de q no hay pibes y ni siquiera te dan la oportunidad. CHAU",
        options: [
            {
                text: "Chau",
                nextText: 106
            },
            {
                text: `O_o`,
                nextText: 106
            }

        ]
    },
    {
        id: 19,
        text: "PERO NO SOY VEGANO!",
        options: [
            {
                text: "*clavar visto*",
                nextText: 107
            },
            {
                text: `la respuesta correcta es: 5, nada que produzca sombra. Gracias, no vuelva nuncas`,
                nextText: 108
            }

        ]
    },
    {
        id: 20,
        text: "Me estas jodiendo, no?",
        options: [
            {
                text: `contame vos, con cuantas te viste`,
                nextText: 36
            },
            {
                text: `No posta te juro, me lo instale hace poco`,
                nextText: 21
            }

        ]
    },
    {
        id: 21,
        text: "bue mejor, no me gusta que me mientan",
        options: [
            {
                text: `a mi tampoco`,
                nextText: 32
            },
            {
                text: `y que pasa si te miento?`,
                nextText: 22
            }

        ]
    },
    {
        id: 22,
        text: "la verdad, nada. Solo que me voy a senitr mal. Eso nada mas",
        options: [
            {
                text: `No te prometo intentarlo, pero intentare intentarlo ajjaja`,
                nextText: 28
            },
            {
                text: `te mintieron mucho?`,
                nextText: 23
            }

        ]
    },
    {
        id: 23,
        text: "lo normal, como a todos, creo. Pero lo suficiente para cansarme jaja",
        options: [
            {
                text: `la historia sin fin`,
                nextText: 24
            },
            {
                text: `si, a quien no le ha pasado no?`,
                nextText: 24
            }

        ]
    },
    {
        id: 24,
        text: "tal cual, pero bue con el tiempo se te va acabando la paciencia. Tampoco es que soy super desconfiado. Solo trato de ser honesto con lo que quiero",
        options: [
            {
                text: `y que queres?`,
                nextText: 25
            },
            {
                text: `y como viene funcionando eso?`,
                nextText: 26
            }

        ]
    },
    {
        id: 25,
        text: "Conocer a alguien, ver si hay onda, si nos llevamos bien. Salir, boludear, charlar. Si flasheamos amor, genial y si no podemos ser amigos, todo bien tambien",
        options: [
            {
                text: `bueno, bien. yo estoy mas para algo casual la verdad`,
                nextText: 27
            },
            {
                text: `che, estas para una birra?`,
                nextText: 111
            }

        ]
    },
    {
        id: 26,
        text: "y depende, en general hay buena onda, pero no siempre. Un match no significa nada, es solo una posibilidad de hablar. No es compromiso de salida y hay gente q se lo toma como muy enserio viste. O se ofenden si no te gustan y se lo decis en vez de ghostear",
        options: [
            {
                text: `Si tal cual. Queres que sigamos por whatsapp?`,
                nextText: 110
            },
            {
                text: `mucho texto`,
                nextText: 112
            }

        ]
    },
    {
        id: 27,
        text: "yo no jja pero no pasa nada. Un gusto haber charlado. Suerte",
        options: [
            {
                text: `igualmente, beso!`,
                nextText: 113
            },
            {
                text: `pero, te vas? no era que todo bien con ser amigos?`,
                nextText: 103
            }

        ]
    },
    {
        id: 28,
        text: "no pasa nada, como mucho no hablamos mas :D",
        options: [
            {
                text: `ey recien empezamos y ya me queres dejar de hablar?`,
                nextText: 31
            },
            {
                text: `eso me agrada`,
                nextText: 29
            }

        ]
    },
    {
        id: 29,
        text: "Te agrada que no hablemos mas? no entendi.",
        options: [
            {
                text: `no! ajaj me referia a q me cae bien tu forma de pensar jaja sono mal, perdon`,
                nextText: 119
            },
            {
                text: `Marge, no voy a mentirte...`,
                nextText: 30
            }

        ]
    },
    {
            id: 30,
            text: "Quien es Marge?",
            options: [
                {
                    text: `y ese es mi pie, para retirarme`,
                    nextText: 104
                },
                {
                    text: `*Clavar Visto*`,
                    nextText: 116
                }
    
            ]
        },
        {
            id: 31,
            text: "jaja no no, pero eso es lo peor que podria pasar y hasta ahora venimos bien. Asi que contame, como te trata tinder?",
            options: [
                {
                    text: `yo diria q no muy bien si todavia sigo aca, no?`,
                    nextText: 7
                },
                {
                    text: `y.. depende mucho con quien te encuentres. A veces male sal`,
                    nextText: 8
                }
        
                ]
            },
            {
                id: 32,
                text: "Alcoyana, Alcoyana. Jjajaj. Que otra cosa no te gusta? a ver si tambien hay coincidencia?",
                options: [
                    {
                        text: `los embusteros`,
                        nextText: 33
                    },
                    {
                        text: `Que no me respondan los mensajes`,
                        nextText: 34
                    }
        
                ]
            },
            {
                id: 33,
                text: "yo crei que le fascinaban! ajajajaja",
                options: [
                    {
                        text: `te amo`,
                        nextText: 103
                    },
                    {
                        text: `tu tienes el ron muchacho`,
                        nextText: 111
                    }
        
                ]
            }
        ,
            {
                id: 34,
                text: "pero sos muy toxica?",
                options: [
                    {
                        text: `o sea que es mi culpa?`,
                        nextText: 35
                    },
                    {
                        text: `EH?`,
                        nextText: 101
                    }
        
                ]
            },
            {
                id: 35,
                text: "No, no quiero decir eso. Pero por ahi sos muy exigente. La gente a veces esta ocupada",
                options: [
                    {
                        text: `*Clavas Visto*`,
                        nextText: 104
                    },
                    {
                        text: `*unmatch*`,
                        nextText: 101
                    }
        
                ]
            },
            {
                id: 36,
                text: "tampoco lo tengo hace mucho. Me vi con una sola y no pegamos onda",
                options: [
                    {
                        text: `o sea, no garchaste`,
                        nextText: 37
                    },
                    {
                        text: `y ella pensaba igual que vos?`,
                        nextText: 38
                    }
        
                ]
            },
            {
                id: 37,
                text: "jjaja bue, no todo es garche. Simplemente no me gusto",
                options: [
                    {
                        text: `y que te hace pensar que yo te voy a gustar?`,
                        nextText: 45
                    },
                    {
                        text: `y se lo dijiste? o ghosteaste?`,
                        nextText: 38
                    }
        
                ]
            },
            {
                id: 38,
                text: "Ni idea, la bloquee jaja",
                options: [
                    {
                        text: `👍🏻`,
                        nextText: 101

                    },
                    {
                        text: `*clavar visto*`,
                        nextText: 104
                    }
        
                ]
            },
            {
                id: 39,
                text: "Uh conmigo cagaste. Ni laburo tengo",
                options: [
                    {
                        text: `o sea que la birra la tendria que pagar yo?`,
                        nextText: 40
                    },
                    {
                        text: `*Unmatch*`,
                        nextText: 101
                    }
        
                ]
            },
            {
                id: 40,
                text: "te molestaria tener que pagarme?",
                options: [
                    {
                        text: `No, para nada`,
                        nextText: 41
                    },
                    {
                        text: `no, pero prefiero ir a medias`,
                        nextText: 42
                    }
        
                ]
            },
            {
                id: 41,
                text: "Genial entonces. Cuando nos vemos?",
                options: [
                    {
                        text: `Cuando te parece?`,
                        nextText: 43
                    },
                    {
                        text: `Algun dia`,
                        nextText: 5
                    }
        
                ]
            },
            {
                id: 42,
                text: "bueno, si queres te aviso cuando consiga laburo",
                options: [
                    {
                        text: `Dale, genial`,
                        nextText: 104
                    },
                    {
                        text: `*Clavas Visto*`,
                        nextText: 118
                    }
        
                ]
            },
            {
                id: 43,
                text: "Haces algo hoy?",
                options: [
                    {
                        text: `hoy no puedo, viernes?`,
                        nextText: 44
                    },
                    {
                        text: `dale, +541132165498`,
                        nextText: 110
                    }
        
                ]
            },
            {
                id: 44,
                text: "Dale, nos vemos el viernes",
                options: [
                    {
                        text: `dale, +541132165498`,
                        nextText: 110
                    },
                    {
                        text: `nos vemos, beso`,
                        nextText: 119
                    }
        
                ]
            },
            {
                id: 45,
                text: "Se nota que sos una persona diferente, muy inteligente. Al menos veo eso en tus fotos",
                options: [
                    {
                        text: `te funciona con alguien ese chamuyo?`,
                        nextText: 46
                    },
                    {
                        text: `ay gracias 🥰`,
                        nextText: 47
                    }
        
                ]
            },
            {
                id: 46,
                text: "no se decime vos. Funciono?",
                options: [
                    {
                        text: `Jajaja si 🥺`,
                        nextText: 110
                    },
                    {
                        text: `no. besito`,
                        nextText: 104
                    }
        
                ]
            },
            {
                id: 47,
                text: "De nada bombon. Y yo.. de q tengo pinta?",
                options: [
                    {
                        text: `de pelotudo, con las preguntas que haces`,
                        nextText: 101
                    },
                    {
                        text: `trato de no formarme una opinion sin concer a la persona`,
                        nextText: 48
                    }
        
                ]
            },
            {
                id: 48,
                text: "Haces bien, no hay q prejuzgar",
                options: [
                    {
                        text: `🤔`,
                        nextText: 119
                    },
                    {
                        text: `como vos, no?`,
                        nextText: 17
                    }
        
                ]
            },
            /* ----- FINALES ----------- */
            {
                id: 101,
                text: "FINAL: Cancelas el match",
                emoji: "❌"
            },
            {
                id: 102,
                text: "FINAL: Lo bloqueas",
                emoji: "⛔️"
            },
            {
                id: 103,
                text: "FINAL: Has sido ghosteada amiga",
                emoji: "👻"
                
            },
            {
                id: 104,
                text: "FINAL: Le dejas de hablar",
                emoji: "🤐"
            },
            {
                id: 105,
                text: "FINAL: Ignorado por molesto",
                emoji: "🗑"
            },
            {
                id: 106,
                text: "FINAL: El chabon te bloquea... whattt?? como se atreve",
                emoji: "🤦🏻‍♀️"
            },
            {
                id: 107,
                text: "FINAL: Claramente no entendio tu pregunta. Le dejas de hablar",
                emoji: "🔇"
            },
            {
                id: 108,
                text: "FINAL: Unmatch por hacerse el picante al pedo",
                emoji: "🧯"
            },
            {
                id: 110,
                text: "FINAL: Le pasas tu whatsapp, siguen hablando. Se ven, flashean amor",
                emoji: "🥰"
            },
            {
                id: 111,
                text: "FINAL: Siguen charlando, se caen bien. CONSEGUISTE LA CITA!. Despues de esa cita, no te habla mas 😬",
                emoji: "🔥"
            },
            {
                id: 112,
                text: "FINAL: Te gusto y te cagas en las patas, por eso lo ghosteas",
                emoji: "🏃‍♀️"
            },
            {
                id: 113,
                text: "FINAL: Termina bien. SIN CITA pero sin bloqueo ni unmatch",
                emoji: "😊"
            },
            {
                id: 116,
                text: "FINAL: Te aburriste. Vas a intentar con otro",
                emoji: "😒"
            },
            {
                id: 118,
                text: "FINAL: No le hablas mas. A los meses te escribe, consiguio laburo y te quiere pagar la birra",
                emoji: "🍺"
            },
            {
                id: 119,
                text: "FINAL: NUNCA MAS CONTESTO",
                emoji: "🥺"
            }
/* 
    ,
    {
        id: xx,
        text: "nxx",
        options: [
            {
                text: `xxx`,
                nextText: xx
            },
            {
                text: `xx`,
                nextText: xx
            }

        ]
    }
*/
]


startGame();