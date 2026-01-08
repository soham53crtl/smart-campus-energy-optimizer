import tensorflow as tf
import numpy as np

X = np.array([[9],[10],[11],[12],[13],[14],[15]])
y = np.array([[400],[500],[600],[700],[750],[720],[680]])

model = tf.keras.Sequential([
    tf.keras.layers.Dense(8, activation='relu'),
    tf.keras.layers.Dense(1)
])

model.compile(optimizer='adam', loss='mse')
model.fit(X, y, epochs=300, verbose=0)

prediction = model.predict([[16]])
print("Predicted usage at 4 PM:", prediction[0][0], "watts")
