import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Chip, Dialog, DialogTitle, DialogContent, List, ListItemButton, ListItemText } from "@mui/material";
import Cookies from "js-cookie";

const PoweredByChip = styled(Chip)(({ theme }) => ({
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    borderRadius: 16,
    boxShadow: theme.shadows[3],
    background: 'linear-gradient(135deg, #b2069b 0%, #3909c2 100%)',
    backdropFilter: "blur(6px)",
    fontWeight: 500,
    color: '#fff',
    cursor: "pointer",
    "&:hover": {
        background: 'linear-gradient(135deg, #b2069b 0%, #3909c2 100%)',
        color: '#fff',
    },
}));

const USERS = [
    {
        name: "Nilkanth Login",
        token: "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBwb3J0Lm9wdGlnbyIsImF1ZCI6ImNtRnFZVzVBY0M1cGJnPT0iLCJ1aWQiOiJjbUZxWVc1QWNDNXBiZz09IiwieWMiOiJlM3R1ZW1WdWZYMTdlekl3ZlgxN2UyOXlZV2xzTWpWOWZYdDdiM0poYVd3eU5YMTkiLCJzdiI6IjAiLCJpYXQiOjE3NTc2Njg2NTIsImV4cCI6MTc1Nzg0MTQ1Mn0.kZwwVJ0-LUkpLvg5LL0BJqir1h43tVGp9U4gqFzLPxQ",
        sessionKey: {
            key: 'userRights',
            value: `[
    {
        "id": 1291,
        "title": "Task(s)"
    },
    {
        "id": 15461,
        "title": "Calendar Schedule"
    },
    {
        "id": 17079,
        "title": "Task Calender View"
    },
    {
        "id": 18206,
        "title": "PowerBi Test"
    },
    {
        "id": 18235,
        "title": "CallLog"
    },
    {
        "id": 18240,
        "title": "QuickTask"
    },
    {
        "id": 18247,
        "title": "ADD TRAINING"
    },
    {
        "id": 18256,
        "title": "Ticket"
    },
    {
        "id": 18262,
        "title": "Ticket ( Admin )"
    },
    {
        "id": 18290,
        "title": "CallBack Request"
    },
    {
        "id": 18292,
        "title": "Training Dashboard"
    },
    {
        "id": 18293,
        "title": "CallLog"
    },
    {
        "id": 18294,
        "title": "Ticket"
    }
]`
        }
    },
    {
        name: "Mayur Login",
        token: "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBwb3J0Lm9wdGlnbyIsImF1ZCI6ImNtRnFZVzVBY0M1cGJnPT0iLCJ1aWQiOiJjbUZxWVc1QWNDNXBiZz09IiwieWMiOiJlM3R1ZW1WdWZYMTdlekl3ZlgxN2UyOXlZV2xzTWpWOWZYdDdiM0poYVd3eU5YMTkiLCJzdiI6IjAiLCJpYXQiOjE3NTc2Njg2NTIsImV4cCI6MTc1Nzg0MTQ1Mn0.kZwwVJ0-LUkpLvg5LL0BJqir1h43tVGp9U4gqFzLPxQ",
        sessionKey: {
            key: 'userRights',
            value: `[
    {
        "id": 1291,
        "title": "Task(s)"
    },
    {
        "id": 15461,
        "title": "Calendar Schedule"
    },
    {
        "id": 17079,
        "title": "Task Calender View"
    },
    {
        "id": 18206,
        "title": "PowerBi Test"
    },
    {
        "id": 18235,
        "title": "CallLog"
    },
    {
        "id": 18240,
        "title": "QuickTask"
    },
    {
        "id": 18247,
        "title": "ADD TRAINING"
    },
    {
        "id": 18256,
        "title": "Ticket"
    },
    {
        "id": 18262,
        "title": "Ticket ( Admin )"
    },
    {
        "id": 18277,
        "title": "Order Delivery ( Admin )"
    },
    {
        "id": 18290,
        "title": "CallBack Request"
    },
    {
        "id": 18291,
        "title": "Order Delivery Dashboard"
    },
    {
        "id": 18292,
        "title": "Training Dashboard"
    },
    {
        "id": 18293,
        "title": "CallLog"
    },
    {
        "id": 18294,
        "title": "Ticket"
    },
    {
        "id": 18321,
        "title": "Order Request"
    }
]`
        }
    },
    {
        name : "Live Patel" ,
        token : `eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBwb3J0Lm9wdGlnbyIsImF1ZCI6ImEyaDFjMmhwUUdWbkxtTnZiUT09IiwidWlkIjoiYTJoMWMyaHBRR1ZuTG1OdmJRPT0iLCJ5YyI6ImUzdHNhWFpsTG05d2RHbG5iMkZ3Y0hNdVkyOXRmWDE3ZXpJd2ZYMTdlMjl3ZEdsbmIyaDFZbjE5ZTN0dmNIUnBaMjlvZFdKOWZRPT0iLCJzdiI6IjEiLCJpYXQiOjE3NjQ2NTU3MzAsImV4cCI6MTc2NDgyODUzMH0.pdh0xyhKgSVqgGFYyvDapBqlVc2lEOO2PI7BMzi5rq0`,
        sessionKey : {
           key: 'userRights',
           value: `[
            {
                "id": 1291,
                "title": "Task(s)"
            },
            {
                "id": 15461,
                "title": "Calendar Schedule"
            },
            {
                "id": 17079,
                "title": "Task Calender View"
            },
            {
                "id": 18206,
                "title": "PowerBi Test"
            },
            {
                "id": 18235,
                "title": "CallLog"
            },
            {
                "id": 18240,
                "title": "QuickTask"
            },
            {
                "id": 18247,
                "title": "ADD TRAINING"
            },
            {
                "id": 18256,
                "title": "Ticket"
            },
            {
                "id": 18262,
                "title": "Ticket ( Admin )"
            },
            {
                "id": 18277,
                "title": "Order Delivery ( Admin )"
            },
            {
                "id": 18290,
                "title": "CallBack Request"
            },
            {
                "id": 18291,
                "title": "Order Delivery Dashboard"
            },
            {
                "id": 18292,
                "title": "Training Dashboard"
            },
            {
                "id": 18293,
                "title": "CallLog"
            },
            {
                "id": 18294,
                "title": "Ticket"
            },
            {
                "id": 18321,
                "title": "Order Request"
            }
        ]`
        }
    } ,
    {
        name : "khusbhu Patel" ,
        token : "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBwb3J0Lm9wdGlnbyIsImF1ZCI6ImNtRnFZVzVBY0M1cGJnPT0iLCJ1aWQiOiJjbUZxWVc1QWNDNXBiZz09IiwieWMiOiJlM3R1ZW1WdWZYMTdlekl3ZlgxN2UyOXlZV2xzTWpWOWZYdDdiM0poYVd3eU5YMTkiLCJzdiI6IjAiLCJpYXQiOjE3NTc2Njg2NTIsImV4cCI6MTc1Nzg0MTQ1Mn0.kZwwVJ0-LUkpLvg5LL0BJqir1h43tVGp9U4gqFzLPxQ",
        sessionKey : {
           key: 'userRights',
           value: `[
    {
        "id": 1291,
        "title": "Task(s)"
    },
    {
        "id": 15461,
        "title": "Calendar Schedule"
    },
    {
        "id": 17079,
        "title": "Task Calender View"
    },
    {
        "id": 18206,
        "title": "PowerBi Test"
    },
    {
        "id": 18235,
        "title": "CallLog"
    },
    {
        "id": 18240,
        "title": "QuickTask"
    },
    {
        "id": 18247,
        "title": "ADD TRAINING"
    },
    {
        "id": 18256,
        "title": "Ticket"
    },
    {
        "id": 18262,
        "title": "Ticket ( Admin )"
    },
    {
        "id": 18277,
        "title": "Order Delivery ( Admin )"
    },
    {
        "id": 18290,
        "title": "CallBack Request"
    },
    {
        "id": 18291,
        "title": "Order Delivery Dashboard"
    },
    {
        "id": 18292,
        "title": "Training Dashboard"
    },
    {
        "id": 18293,
        "title": "CallLog"
    },
    {
        "id": 18294,
        "title": "Ticket"
    },
    {
        "id": 18321,
        "title": "Order Request"
    }
]`
    }
    } ,
    {
    name : "demira Patel" ,
    token : "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBwb3J0Lm9wdGlnbyIsImF1ZCI6ImNtRnFZVzVBY0M1cGJnPT0iLCJ1aWQiOiJjbUZxWVc1QWNDNXBiZz09IiwieWMiOiJlM3R1ZW1WdWZYMTdlekl3ZlgxN2UyOXlZV2xzTWpWOWZYdDdiM0poYVd3eU5YMTkiLCJzdiI6IjAiLCJpYXQiOjE3NTc2Njg2NTIsImV4cCI6MTc1Nzg0MTQ1Mn0.kZwwVJ0-LUkpLvg5LL0BJqir1h43tVGp9U4gqFzLPxQ",
    sessionKey : {
       key: 'userRights',
       value:`[
    {
        "id": 1291,
        "title": "Task(s)"
    },
    {
        "id": 15461,
        "title": "Calendar Schedule"
    },
    {
        "id": 17079,
        "title": "Task Calender View"
    },
    {
        "id": 18206,
        "title": "PowerBi Test"
    },
    {
        "id": 18235,
        "title": "CallLog"
    },
    {
        "id": 18240,
        "title": "QuickTask"
    },
    {
        "id": 18247,
        "title": "ADD TRAINING"
    },
    {
        "id": 18256,
        "title": "Ticket"
    },
    {
        "id": 18262,
        "title": "Ticket ( Admin )"
    },
    {
        "id": 18277,
        "title": "Order Delivery ( Admin )"
    },
    {
        "id": 18290,
        "title": "CallBack Request"
    },
    {
        "id": 18291,
        "title": "Order Delivery Dashboard"
    },
    {
        "id": 18292,
        "title": "Training Dashboard"
    },
    {
        "id": 18293,
        "title": "CallLog"
    },
    {
        "id": 18294,
        "title": "Ticket"
    },
    {
        "id": 18321,
        "title": "Order Request"
    }
]`
    }
    }
];

// https://88j7x82m-3000.inc1.devtunnels.ms/

export default function PoweredByLogin() {
    const [open, setOpen] = useState(false);

    const handleSelect = (user) => {
        Cookies.set("help_support", user.token, { expires: 1 }); // 1-day expiry
        Cookies.set("isUserLoggedIn", true, { expires: 1 });
        sessionStorage.setItem(user.sessionKey.key, user.sessionKey.value);
        window.location.reload();
    };

    return (
        <>
            <PoweredByChip
                label="Powered by Optigo"
                onClick={() => setOpen(true)}
            />

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                PaperProps={{
                    sx: { borderRadius: 3, p: 1, minWidth: 320 },
                }}
            >
                <DialogTitle sx={{ fontWeight: 600, textAlign: "center" }}>
                    Choose your login
                </DialogTitle>
                <DialogContent>
                    <List>
                        {USERS.map((user) => (
                            <ListItemButton
                                key={user.name}
                                onClick={() => handleSelect(user)}
                                sx={{
                                    borderRadius: 2,
                                    mb: 1,
                                    "&:hover": {
                                        bgcolor: "primary.main",
                                        color: "primary.contrastText",
                                    },
                                }}
                            >
                                <ListItemText primary={user.name} />
                            </ListItemButton>
                        ))}
                    </List>
                </DialogContent>
            </Dialog>
        </>
    );
}
