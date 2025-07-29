import socketio

sio = socketio.Server(cors_allowed_origins='*')
app = socketio.WSGIApp(sio)

@sio.event
def connect(sid, environ):
    print('Client connected', sid)
    # sio.emit('user_joined_in_chat', {'sender': 'system', 'message': 'Someone entered the chat'})

@sio.event
def disconnect(sid):
    print('Client disconnected', sid)

@sio.event
def message(sid, data):
    print('Message from', sid, ':', data)
    sio.emit('message', {'username': data['username'], 'message': data['message']}, skip_sid=sid)

if __name__ == '__main__':
    from eventlet import wsgi
    import eventlet
    wsgi.server(eventlet.listen(('0.0.0.0', 5000)), app)